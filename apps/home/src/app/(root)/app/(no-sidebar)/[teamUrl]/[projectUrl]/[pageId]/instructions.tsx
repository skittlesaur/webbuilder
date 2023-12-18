import { useEffect, useState } from 'react'
import type { CallBackProps, Step } from 'react-joyride'
import Joyride, { STATUS } from 'react-joyride'
import { createId } from '@paralleldrive/cuid2'
import Link from 'next/link'
import { toast } from 'sonner'
import type { Element } from '@/stores/canvas-store'
import { useCanvasStore } from '@/stores/canvas-store'
import { useInteractionsStore } from '@/stores/interactions-store'
import api from '@/lib/api'
import getErrorMessage from '@/lib/get-error-message'
import useUser from '@/resolvers/use-user'

const defaultElements: Element[] = [
  {
    id: 'onboarding-2',
    type: 'p',
    children: [
      'This guide will walk you through the basics of using the application.',
    ],
    style: {
      default: {
        fontSize: '1rem',
        lineHeight: '1.5',
        color: '#000000',
      },
    },
  },
  {
    id: 'onboarding-1',
    type: 'h1',
    children: ['Welcome to the Canvas'],
    style: {
      default: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        lineHeight: '1.25',
        letterSpacing: '-0.025em',
        color: '#000000',
      },
    },
  },
]

const componentsElements: Element[] = [
  {
    id: 'onboarding-component',
    type: 'div',
    style: {
      default: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        background: '#1F2937FF',
        borderRadius: '0.5rem',
        color: '#FFFFFF',
        maxWidth: '32rem',
        gap: '0.75rem',
      },
    },
    children: [
      {
        id: createId(),
        type: 'h1',
        children: [
          {
            id: createId(),
            type: 'span',
            children: ['Web Builders Are Amazing'],
            style: {
              default: {
                marginBottom: '2px',
                fontSize: '2xl',
                fontWeight: 'bold',
                color: 'gray-900',
              },
            },
          },
        ],
        style: {},
      },
      {
        id: createId(),
        type: 'p',
        children: [
          'They allow you to create websites without writing a single line of code.',
        ],
        style: {
          default: {
            fontSize: '1rem',
            lineHeight: '1.5',
            color: '#9CA3AF',
          },
        },
      },
      {
        id: createId(),
        type: 'a',
        children: [
          {
            id: createId(),
            type: 'span',
            children: ['Read more'],
            style: {},
          },
        ],
        attributes: {
          href: '#',
        },
        style: {
          default: {
            display: 'inline-flex',
            alignItems: 'center',
            background: 'var(--primary, #923FDE)',
            borderRadius: '0.375rem',
            paddingLeft: '0.75rem',
            paddingRight: '0.75rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            color: '#FFFFFF',
            width: 'fit-content',
          },
        },
      },
    ],
  },
]

const steps: Step[] = [
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Welcome to the Canvas</h1>
        <p className="text-sm text-neutral-200">
          This guide will walk you through the basics of using the application.
          You can always restart this tour by clicking the{' '}
          <span className="font-semibold">Instructions</span> button in the top
          right corner.
        </p>
      </>
    ),
    placement: 'center',
    target: 'body',
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Actions Panel</h1>
        <p className="text-sm text-neutral-200">
          This panel contains all the actions you can perform on the canvas,
          starting from adding elements to the canvas, managing assets and
          components, layers, and pages.
        </p>
      </>
    ),
    placement: 'right',
    target: '#side-actions',
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Add Elements</h1>
        <p className="text-sm text-neutral-200">
          Click on the <span className="font-semibold">Add Elements</span>{' '}
          button to open the add elements panel.
        </p>
      </>
    ),
    placement: 'right',
    target: '#add-elements',
    spotlightClicks: true,
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Add Elements</h1>
        <p className="text-sm text-neutral-200">
          <span className="font-medium underline underline-offset-4">
            Drag and drop
          </span>{' '}
          elements from the add elements panel to the canvas.
        </p>
      </>
    ),
    placement: 'right',
    target: '#add-elements-panel',
    spotlightClicks: true,
    disableOverlay: true,
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">A Little Help</h1>
        <p className="text-sm text-neutral-200">
          We have added some elements to the canvas for you to get you through
          this tour.
        </p>
      </>
    ),
    placement: 'center',
    target: 'body',
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Layers Panel</h1>
        <p className="text-sm text-neutral-200">
          This panel contains all the layers on the canvas. Open the layers
          panel by clicking on the <span className="font-semibold">Layers</span>{' '}
          button.
        </p>
      </>
    ),
    placement: 'right',
    target: '#layers',
    spotlightClicks: true,
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Reorder Layers</h1>
        <p className="text-sm text-neutral-200">
          You can drag and drop layers to reorder them. Try putting the heading
          layer above the paragraph layer.
        </p>
      </>
    ),
    placement: 'right',
    target: '#layers-panel',
    spotlightClicks: true,
    disableOverlay: true,
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">That Looks Better!</h1>
        <p className="text-sm text-neutral-200">
          Now, let&apos;s try and make the heading look better.
        </p>
      </>
    ),
    placement: 'center',
    target: 'body',
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Selecting a Layer</h1>
        <p className="text-sm text-neutral-200">
          Click on the heading layer to select it either from the canvas or the
          layers panel.
        </p>
      </>
    ),
    placement: 'bottom',
    target: '[data-default-breakpoint="true"] #onboarding-1',
    spotlightClicks: true,
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Properties Panel</h1>
        <p className="text-sm text-neutral-200">
          This panel contains all the properties of the selected element. You
          can modify styling, attributes, and add events to the element from
          here.
        </p>
      </>
    ),
    placement: 'left',
    target: '#properties-panel',
    spotlightClicks: true,
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Modify Styling</h1>
        <p className="text-sm text-neutral-200">
          Try scrolling down to the{' '}
          <span className="font-semibold underline underline-offset-4">
            Typography
          </span>{' '}
          section and change the font size to{' '}
          <span className="font-semibold">2rem</span>.
        </p>
      </>
    ),
    placement: 'left',
    target: '#properties-panel',
    spotlightClicks: true,
    disableOverlay: true,
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Attributes Tab</h1>
        <p className="text-sm text-neutral-200">
          Attributes are the properties of an element that are not related to
          styling. These are useful for elements such as links, images, inputs,
          etc.
        </p>
      </>
    ),
    placement: 'bottom',
    target: '#properties-panel-tab-attributes',
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Events Tab</h1>
        <p className="text-sm text-neutral-200">
          Events are the actions that can be performed on an element. However,
          you need to write JavaScript code to make them work.
        </p>
      </>
    ),
    placement: 'bottom',
    target: '#properties-panel-tab-events',
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Variables</h1>
        <p className="text-sm text-neutral-200">
          Variables are useful for storing values that can be used across the
          project. You can create variables from the{' '}
          <span className="font-semibold">Variables</span> tab.
        </p>
      </>
    ),
    placement: 'left',
    target: '#properties-panel',
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Create a Color Style</h1>
        <p className="text-sm text-neutral-200">
          Click on the <span className="font-semibold">Add Color</span> button
          to open the color styles modal. Create a new color style and name it
          as <span className="font-semibold">Primary</span>.
        </p>
      </>
    ),
    placement: 'bottom',
    target: 'body',
    spotlightClicks: true,
    disableOverlay: true,
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Components</h1>
        <p className="text-sm text-neutral-200">
          Components are a group of elements that can be reused across the
          project. We have added a couple of elements for you to get you
          started.
        </p>
      </>
    ),
    placement: 'center',
    target: 'body',
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Creating a Component</h1>
        <p className="text-sm text-neutral-200">
          Select the element we created earlier. Make sure you select the whole
          element not the text inside it.
        </p>
      </>
    ),
    placement: 'bottom',
    target: '#onboarding-component',
    spotlightClicks: true,
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Creating a Component</h1>
        <p className="text-sm text-neutral-200">
          Click on the <span className="font-semibold">Make Component</span>{' '}
          button to create a component from the selected element.
        </p>
      </>
    ),
    placement: 'left',
    target: '#make-component',
    spotlightClicks: true,
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">Using a Component</h1>
        <p className="text-sm text-neutral-200">
          Navigate to the{' '}
          <span className="font-semibold">Assets and Components</span> panel.
          You will find the component we created in the{' '}
          <span className="font-semibold">Components</span> section. You can
          drag and drop it to the canvas to use it.
        </p>
      </>
    ),
    placement: 'right',
    target: '#assets-components',
    spotlightClicks: true,
  },
  {
    content: (
      <>
        <h1 className="text-lg font-bold">
          You&apos;re all set! Happy building!
        </h1>
        <p className="text-sm text-neutral-200">
          You can always restart this tour by clicking the{' '}
          <span className="font-semibold">Instructions</span> button in the top
          right corner. You can also read our{' '}
          <Link
            className="font-semibold text-white underline underline-offset-4"
            href="/docs"
            target="_blank">
            documentation
          </Link>{' '}
          to learn more about the application.
        </p>
      </>
    ),
    placement: 'center',
    target: 'body',
  },
]

const Instructions = () => {
  const [run, setRun] = useState(false)

  const setElements = useCanvasStore((s) => s.setElements)
  const setZoom = useCanvasStore((s) => s.setZoom)
  const setPan = useCanvasStore((s) => s.setPan)
  const setSelectedElementId = useInteractionsStore(
    (s) => s.setSelectedElementId
  )
  const completedInstructions = useCanvasStore((s) => s.completedInstructions)
  const setCompletedInstructions = useCanvasStore(
    (s) => s.setCompletedInstructions
  )

  const { user } = useUser()

  useEffect(() => {
    setRun(!completedInstructions)
  }, [completedInstructions])

  const handleJoyrideCallback = async (data: CallBackProps) => {
    if (!run) return
    const { status, type, index } = data

    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setRun(false)
    }

    if (index === 1) {
      setZoom(2.5)
      setPan({
        x: 610,
        y: 75,
      })
    } else if (index === 4) {
      setElements(defaultElements)
    } else if (index === 7) {
      setElements(defaultElements.reverse())
    } else if (index === 9) {
      setSelectedElementId('onboarding-1')
    } else if (index === 11) {
      if (defaultElements[0].style.default)
        defaultElements[0].style.default.fontSize = '2rem'
      setElements(defaultElements)
    } else if (index === 13) {
      setSelectedElementId(null)
    } else if (index === 15) {
      setElements(componentsElements)
    } else if (index === 17) {
      setSelectedElementId('onboarding-component')
    }

    if (type === 'tour:end') {
      setRun(false)
      try {
        if (user?.onboarded) return
        await api.post('/user/complete-onboarding')
        toast.success('Onboarding Completed')
      } catch (err) {
        toast.error(getErrorMessage(err))
      } finally {
        setCompletedInstructions(true)
      }
    }
  }

  return (
    <Joyride
      continuous
      disableOverlayClose
      scrollToFirstStep
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      run={run}
      steps={steps}
      styles={{
        options: {
          zIndex: 99,
        },
        tooltip: {
          border: '1px solid #1F2937',
          background: '#040711',
          color: '#F9FAFB',
          maxWidth: '32rem',
          padding: '1.5rem',
          borderRadius: '0.5rem',
        },
        buttonNext: {
          background: '#1F2937',
          color: '#F9FAFB',
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
        },
        buttonSkip: {
          background: '#1F2937',
          color: '#F9FAFB',
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
        },
        buttonClose: {
          color: '#F9FAFB',
        },
        tooltipContent: {
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          alignItems: 'start',
          textAlign: 'left',
        },
        buttonBack: {
          color: '#A3A3A3',
        },
      }}
    />
  )
}

export default Instructions
