import type { MDXComponents } from 'mdx/types'
import Divider from '@/components/mdx/divider'
import Heading2 from '@/components/mdx/h2'
import Ol from '@/components/mdx/ol'
import Paragraph from '@/components/mdx/paragraph'
import Subheading from '@/components/mdx/subheading'
import LinkComponent from '@/components/mdx/link'
import Image from '@/components/mdx/image'
import Ul from '@/components/mdx/ul'
import Shortcut from '@/components/mdx/shortcut'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ children, ...rest }) => (
      <h1 className="text-4xl font-medium lg:text-5xl" {...rest}>
        {children}
      </h1>
    ),
    h2: ({ children }) => <Heading2>{children}</Heading2>,
    p: ({ children }) => <Paragraph>{children}</Paragraph>,
    ol: ({ children, start }) => <Ol start={start}>{children}</Ol>,
    ul: ({ children }) => <Ul>{children}</Ul>,
    a: ({ href, children }) => (
      <LinkComponent href={href}>{children}</LinkComponent>
    ),
    Image,
    Subheading,
    Divider,
    Shortcut,
  }
}
