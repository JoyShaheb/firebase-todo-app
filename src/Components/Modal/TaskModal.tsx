import React, { FC } from 'react'
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export interface ITaskModalProps {
  button: JSX.Element;
  title: string;
  onConfirm: () => void;
}

const TaskModal: FC<ITaskModalProps> = ({
  button,
  title,
  onConfirm,
}) => {
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
        <Button variant="outline">{button}</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
                <form>

                </form>
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type='submit' onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
</AlertDialog>
  )
}

export default TaskModal