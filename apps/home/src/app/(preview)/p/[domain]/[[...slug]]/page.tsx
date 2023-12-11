'use client'
import '../../../../globals.css'
import 'ui/styles.css'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { useRouter } from 'next/navigation'
import PreviewCard from './preview-card'
import FullLoader from '@/components/full-loader'
import exportHtmlCss from '@/lib/export/html-css'

const Page = ({ params }: { params: { domain: string; slug?: string[] } }) => {
  const router = useRouter()

  const [result, setResult] = useState<{
    html: string | JSX.Element | JSX.Element[]
    css: string
  } | null>(null)

  const { data, isLoading } = useSWR(
    [params.domain, params.slug?.join('/') || '/'],
    () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/public/${params.domain}?page=${
          params.slug?.join('/') || '/'
        }`
      ).then((res) => res.json()),
    {
      revalidateOnFocus: false,
      errorRetryCount: 0,
      onError: () => {
        if (!params.slug || params.slug?.join('/') === '/')
          return router.replace(process.env.NEXT_PUBLIC_SITE_URL || '/')

        router.replace(`${process.env.NEXT_PUBLIC_SITE_URL}/p/${params.domain}`)
      },
    }
  )

  useEffect(() => {
    const getData = async () => {
      const res = await exportHtmlCss({
        overrideElements: data.elements,
        overrideBreakpoints: data.breakpoints,
        overrideBodyStyles: data.bodyStyles,
        overrideVariables: data.variables,
        skipDownload: true,
      })

      if (!res) return router.replace(process.env.NEXT_PUBLIC_SITE_URL || '/')

      const { htmlNode, css } = res

      const bodyContent = htmlNode.querySelector('body')?.innerHTML
      if (!bodyContent)
        return router.replace(process.env.NEXT_PUBLIC_SITE_URL || '/')

      const parsedContent = parse(bodyContent)

      setResult({
        html: parsedContent,
        css,
      })
    }

    if (data) void getData()
  }, [data, router])

  if (isLoading || !result || !data)
    return <FullLoader title="Loading Preview" />

  return (
    <>
      <PreviewCard />
      {result.html}
      <style dangerouslySetInnerHTML={{ __html: result.css }} />
    </>
  )
}

export default Page
