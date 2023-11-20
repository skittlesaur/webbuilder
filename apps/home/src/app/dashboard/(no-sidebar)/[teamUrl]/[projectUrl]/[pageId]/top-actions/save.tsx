'use client'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { useCallback, useEffect, useState } from 'react'
import ImportIcon from '@/icons/cloud-upload-outline.svg'
import { useCanvasStore } from '@/stores/canvas-store'
import api from '@/lib/api'

const SaveButton = () => {
  const [isSaving, setIsSaving] = useState(false)

  const { teamUrl, projectUrl, pageId } = useParams()
  const teamUrlString = Array.isArray(teamUrl) ? teamUrl[0] : teamUrl
  const projectUrlString = Array.isArray(projectUrl)
    ? projectUrl[0]
    : projectUrl
  const pageIdString = Array.isArray(pageId) ? pageId[0] : pageId

  const saveChanges = useCallback(async () => {
    if (isSaving) return

    const {
      elements,
      bodyStyles,
      customFonts,
      assets,
      components,
      breakpoints,
      pan,
      zoom,
    } = useCanvasStore.getState()

    setIsSaving(true)

    await api.put(
      `/team/${teamUrlString}/project/${projectUrlString}/page/${pageIdString}`,
      {
        elements,
        bodyStyles,
        customFonts,
        assets,
        components,
        breakpoints,
        pan,
        zoom,
      }
    )

    setIsSaving(false)
  }, [isSaving, teamUrlString, projectUrlString, pageIdString, setIsSaving])

  // auto save changes every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        toast.promise(saveChanges(), {
          loading: 'Auto saving changes...',
          success: 'Changes saved successfully',
          error: 'Failed to save changes, please try again later',
        })
      },
      1000 * 60 * 5
    )

    return () => clearInterval(interval)
  }, [saveChanges])

  // ctrl/cmd + s to save changes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()

        toast.promise(saveChanges(), {
          loading: 'Saving changes...',
          success: 'Changes saved successfully',
          error: 'Failed to save changes, please try again later',
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [saveChanges])

  return (
    <TooltipProvider disableHoverableContent delayDuration={300}>
      <Tooltip>
        <TooltipTrigger
          className="flex items-center justify-center transition-colors duration-150 ease-in-out rounded w-7 h-7 hover:bg-secondary disabled:opacity-50"
          disabled={isSaving}
          onClick={() => {
            toast.promise(saveChanges(), {
              loading: 'Saving changes...',
              success: 'Changes saved successfully',
              error: 'Failed to save changes, please try again later',
            })
          }}>
          <ImportIcon className="w-4 h-4" />
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
