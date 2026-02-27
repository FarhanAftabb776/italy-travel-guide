import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Next.js 16 Proxy Middleware
export async function proxy(request: NextRequest) {
    // Safety Check: If environment variables are missing (e.g. during first Vercel build)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.warn("[Proxy] Missing Supabase environment variables. Skipping auth check.");
        return NextResponse.next();
    }

    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    try {
        const { data: { user } } = await supabase.auth.getUser()

        // Final Path Mapping
        const path = request.nextUrl.pathname;

        // Redirect /admin -> /admin/dashboard
        if (path === '/admin') {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }

        // Protected routes
        if (path.startsWith('/admin/dashboard') && !user) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        if (path.startsWith('/admin/login') && user) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }
    } catch (e) {
        console.error("[Proxy Error]", e);
    }

    return response
}

export default proxy;

export const config = {
    matcher: ['/admin/:path*'],
}
