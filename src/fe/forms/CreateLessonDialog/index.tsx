import React from 'react'
import { Grid } from '@material-ui/core'
import { useMutation } from 'fe/utils/apollo'
import { CREATE_LESSON } from 'fe/queries/lesson'
import 'date-fns'
import { useAuthContext } from 'fe/context/auth'
import LessonFields from './helpers/LessonFields'
import DialogForm from '../Dialog'
import AddIcon from '@material-ui/icons/Add'

interface ICreateLessonData {
  name: string
  day: string
  startTime: Date
  endTime: Date
}

interface ICreateLessonDialogProps {
  refetch: Function
}

const CreateLessonDialog: React.FC<ICreateLessonDialogProps> = ({ refetch }) => {
  const { tenant } = useAuthContext()
  const [createLesson] = useMutation(CREATE_LESSON, refetch) as any
  const getDate = (hoursToAdd = 0) => {
    const fiveMins = 1000 * 60 * 5
    const date = new Date()
    date.setHours(date.getHours() + hoursToAdd)
    return new Date(Math.round(date.getTime() / fiveMins) * fiveMins)
  }

  const createHandler = (variables: ICreateLessonData) => {
    createLesson({
      variables: {
        input: {
          ...variables,
          startTime: new Date(variables.startTime),
          endTime: new Date(variables.endTime),
          application: tenant,
        },
      },
    })
  }
  const initialValues = {
    startTime: getDate(),
    endTime: getDate(1),
  }

  return (
    <DialogForm
      trigger={<AddIcon />}
      onSubmit={createHandler}
      initialValues={initialValues}
      title="Create lesson"
    >
      {({ submitting }: { submitting: boolean }) => {
        return (
          <Grid container spacing={2}>
            <LessonFields disabled={submitting} />
          </Grid>
        )
      }}
    </DialogForm>
  )
}

export default CreateLessonDialog
