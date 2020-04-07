import React from 'react'
import SimpleForm from 'fe/forms/Simple'
import { Grid, Typography } from '@material-ui/core'
import { useMutation } from 'fe/utils/apollo'
import { CREATE_LESSON } from 'fe/queries/lesson'
import 'date-fns'
import urls from 'fe/urls'
import { useAuthContext } from 'fe/context/auth'
import LessonFields from '../helpers/LessonFields'

interface ICreateLessonData {
  name: string
  day: string
  startTime: Date
  endTime: Date
}

const CreateLesson = () => {
  const { tenant } = useAuthContext()
  const [createLesson] = useMutation(CREATE_LESSON) as any
  const getDate = (hoursToAdd = 0) => {
    const coeff = 1000 * 60 * 5
    const date = new Date() //or use any other date
    date.setHours(date.getHours() + hoursToAdd)
    return new Date(Math.round(date.getTime() / coeff) * coeff)
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
    <>
      <SimpleForm
        onSubmit={createHandler}
        redirectOnSubmit={urls.lessons.list}
        initialValues={initialValues}
      >
        {({ submitting }: { submitting: boolean }) => {
          return (
            <>
              <Typography variant="h5">Create lesson</Typography>
              <Grid container spacing={2}>
                <LessonFields disabled={submitting} />
              </Grid>
            </>
          )
        }}
      </SimpleForm>
    </>
  )
}

export default CreateLesson
