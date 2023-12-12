'use client'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { useCallback, useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import SaveIcon from '@/icons/save-outline.svg'
import { useCanvasStore } from '@/stores/canvas-store'
import api from '@/lib/api'
import uploadImage from '@/lib/upload-image'

const SaveButton = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [lastSave, setLastSave] = useState<Date>(new Date())

  const { teamUrl, projectUrl, pageId } = useParams()
  const teamUrlString = Array.isArray(teamUrl) ? teamUrl[0] : teamUrl
  const projectUrlString = Array.isArray(projectUrl)
    ? projectUrl[0]
    : projectUrl
  const pageIdString = Array.isArray(pageId) ? pageId[0] : pageId

  const saveChanges = useCallback(async () => {
    if (isSaving) return

    setIsSaving(true)

    const {
      elements,
      bodyStyles,
      customFonts,
      assets,
      variables,
      components,
      breakpoints,
      pan,
      zoom,
    } = useCanvasStore.getState()

    const defaultBreakpoint = document.querySelector(
      '[data-default-breakpoint]'
    )

    let screenshotUrl: string | null = null

    try {
      if (defaultBreakpoint) {
        const breakpointClone = defaultBreakpoint.cloneNode(true) as HTMLElement
        breakpointClone.id = 'screenshot-clone'
        breakpointClone.style.position = 'absolute'
        breakpointClone.style.top = '0'
        breakpointClone.style.left = '0'
        breakpointClone.style.zIndex = '-1'
        breakpointClone.style.minWidth = '800px'
        breakpointClone.style.minHeight = '450px'
        breakpointClone.style.maxWidth = '800px'
        breakpointClone.style.maxHeight = '450px'
        breakpointClone.style.overflow = 'hidden'

        document.body.setAttribute(
          'style',
          variables
            .map(
              (v) => `--${v.name.toLowerCase().replace(/ /g, '-')}: ${v.value};`
            )
            .join(' ')
        )

        document.body.appendChild(breakpointClone)

        const canvas = await html2canvas(breakpointClone)
        const dataURL = canvas.toDataURL()

        screenshotUrl = await uploadImage(dataURL)

        document.body.removeAttribute('style')
        breakpointClone.remove()
      }
    } catch (e) {
      toast.warning('Failed to take screenshot, this will not affect the save')
    }

    try {
      await api.put(
        `/team/${teamUrlString}/project/${projectUrlString}/page/${pageIdString}`,
        {
          elements,
          bodyStyles,
          customFonts,
          assets,
          variables,
          components,
          breakpoints,
          pan,
          zoom,
          screenshotUrl,
        }
      )

      setLastSave(new Date())
    } finally {
      setIsSaving(false)
    }
  }, [isSaving, teamUrlString, projectUrlString, pageIdString, setIsSaving])

  // auto save changes every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (isSaving) return
        const now = new Date()
        const diff = now.getTime() - lastSave.getTime()
        const diffInMinutes = Math.round(diff / 1000 / 60)
        if (diffInMinutes < 5) return

        toast.promise(saveChanges(), {
          loading: 'Auto saving changes...',
          success: 'Changes saved successfully',
          error: 'Failed to save changes, please try again later',
        })
      },
      1000 * 60 * 5
    )

    return () => clearInterval(interval)
  }, [isSaving, lastSave, saveChanges])

  // ctrl/cmd + s to save changes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()

        if (isSaving) return
        toast.promise(saveChanges(), {
          loading: 'Saving changes...',
          success: 'Changes saved successfully',
          error: 'Failed to save changes, please try again later',
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSaving, saveChanges])

  return (
    <TooltipProvider disableHoverableContent delayDuration={300}>
      <Tooltip>
        <TooltipTrigger
          className="flex items-center justify-center transition-colors duration-150 ease-in-out rounded w-7 h-7 hover:bg-secondary disabled:opacity-50"
          disabled={isSaving}
          onClick={() => {
            if (isSaving) return
            toast.promise(saveChanges(), {
              loading: 'Saving changes...',
              success: 'Changes saved successfully',
              error: 'Failed to save changes, please try again later',
            })
          }}>
          <SaveIcon className="w-4 h-4" />
        </TooltipTrigger>
        <TooltipContent
          className="h-8"
          data-canvas-function="true"
          side="bottom"
          sideOffset={8}>
          Save
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default SaveButton
