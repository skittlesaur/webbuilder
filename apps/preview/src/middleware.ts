import { NextRequest, NextResponse } from "next/server"

const HOST_REPLACEMENTS = [
  '.app.baraa:3001',
  '.builder.baraa.app'
]

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
}

const removeExtraHostParts = (hostname: string) => {
  let result = hostname
  HOST_REPLACEMENTS.forEach((part) => (result = result.replace(part, '')))
  return result
}

export default function middleware(req: NextRequest) {
  const hostname = req.headers.get('host')

  if (!hostname) {
    return new NextResponse('Missing hostname', { status: 400 })
  }

  const { pathname } = req.nextUrl

  const currentHost = removeExtraHostParts(hostname)

  const url = req.nextUrl.clone()
  
  url.pathname = `/${currentHost}${pathname}`
  return NextResponse.rewrite(url)
}