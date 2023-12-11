import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'ui'
import AddIcon from '@/icons/add.svg'

const AddFill = ({ shouldAlert, onAddClick }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (shouldAlert) setIsOpen(open)
        else onAddClick()
      }}>
      <AlertDialogTrigger>
        <AddIcon className="w-4 h-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a fill</AlertDialogTitle>
          <AlertDialogDescription>
            You can only have one color fill, adding another will replace the
            current one with a gradient fill.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onAddClick()
              setIsOpen(false)
            }}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AddFill
