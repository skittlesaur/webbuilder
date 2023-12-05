import { redirect } from 'next/navigation'
import parse from 'html-react-parser'
import getHtmlCss from './get-html-css'

const getPage = async (domain: string, page: string) => {
  try {
    const res = await fetch(
      `${process.env.API_URL}/public/${domain}?page=${page}`
    )
    if (res.ok) {
      return await res.json()
    }

    throw new Error('Not found')
  } catch (error) {
    if (page === '/') redirect('https://builder.baraa.app')
    else redirect(`https://${domain}.builder.baraa.app`)
  }
}

const Page = async ({
  params,
}: {
  params: { domain: string; slug?: string[] }
}) => {
  const page = params.slug?.join('/') || '/'
  const pageWithSlash = page.startsWith('/') ? page : `/${page}`
  const data = await getPage(params.domain, pageWithSlash)

  const { body, css } = getHtmlCss({
    elements: data.elements,
    breakpoints: data.breakpoints,
    bodyStyles: data.bodyStyles,
  })

  const parsedBody = parse(body)

  return (
    <>
      {parsedBody}
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </>
  )
}

export default Page
