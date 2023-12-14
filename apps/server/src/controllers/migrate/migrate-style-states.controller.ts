import { Request, Response } from 'express'

const migrateStyleStates = async (req: Request, res: Response) => {
  try {
    const start = performance.now()
    const { prisma } = req.context

    const pages = await prisma.page.findMany()

    const promises = pages.map((page) => {
      const { elements, components } = page

      const deepFormatNewStyleStates = (element: any) => {
        if (typeof element === 'string') {
          return element
        }

        const style = element.style || {}
        const mediaQueries = element.mediaQueries || {}

        const newStyle = {
          default: style,
          hover: {},
          focus: {},
          active: {},
          visited: {},
          disabled: {},
        }

        const newMediaQueries = Object.keys(mediaQueries).reduce(
          (acc, curr) => {
            const mediaQueryStyle = mediaQueries[curr]

            const newMediaQueryStyle = {
              default: mediaQueryStyle,
              hover: {},
              focus: {},
              active: {},
              visited: {},
              disabled: {},
            }

            return {
              ...acc,
              [curr]: newMediaQueryStyle,
            }
          },
          {}
        )

        return {
          ...element,
          style: newStyle,
          mediaQueries: newMediaQueries,
        }
      }

      const newElements = elements.map(deepFormatNewStyleStates)
      const newComponents = components.map((c: any) =>
        deepFormatNewStyleStates(c.element)
      )

      return prisma.page.update({
        where: {
          id: page.id,
        },
        data: {
          elements: {
            set: newElements,
          },
          components: {
            set: newComponents,
          },
        },
      })
    })

    await Promise.all(promises)

    const end = performance.now()
    const durationInSeconds = (end - start) / 1000

    return res.status(200).json({
      message: 'Migrated style states successfully',
      duration: `${durationInSeconds.toFixed(2)} seconds`,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal server error',
    })
  }
}

export default migrateStyleStates
