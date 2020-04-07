import React from 'react'
import LessonFields from '../helpers/LessonFields'
import SimpleForm from 'fe/forms/Simple'
import { RouteComponentProps } from 'react-router-dom'
import { useQuery, useMutation } from 'fe/utils/apollo'
import { GET_LESSON, UPDATE_LESSON } from 'fe/queries/lesson'
import { ILesson } from '../List'
import { Typography, Paper, Grid } from '@material-ui/core'
import MaterialTable from 'material-table'

import EditIcon from '@material-ui/icons/Edit'
import history from 'fe/utils/history'
import urls from 'fe/urls'
import PlayerLessonTable from './PlayerLessonTable'

interface ILessonResponse {
  data: {
    lesson?: ILesson
  }
  refetch: Function
}
interface IViewLessonProps extends RouteComponentProps<{ id: string }> {
  isEdit?: boolean
}

const ViewLesson: React.FC<IViewLessonProps> = ({
  match: {
    params: { id },
  },
  isEdit,
}) => {
  const {
    data: { lesson },
    refetch,
  }: ILessonResponse = useQuery(GET_LESSON, { variables: { id: ~~id } })
  const [updateLesson] = useMutation(UPDATE_LESSON, refetch) as any

  if (!lesson) return null

  const onSubmit = ({ name, startTime, endTime, day }: any) => {
    if (isEdit) {
      const input = { name, startTime, endTime, day }
      updateLesson({
        variables: {
          id: ~~id,
          input,
        },
      })
    }
  }

  return (
    <>
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="h4" style={{ marginBottom: 32 }}>
            Lesson - {lesson.name}
          </Typography>
        </Grid>
        {!isEdit && (
          <Grid item>
            <EditIcon color="primary" onClick={() => history.push(urls.lessons.edit(id))} />
          </Grid>
        )}
      </Grid>
      <SimpleForm
        withPaper={false}
        initialValues={lesson}
        onSubmit={onSubmit}
        showCancel={!!isEdit}
        showSubmit={!!isEdit}
        redirectOnSubmit={urls.lessons.view(id)}
      >
        {({ submitting }: { submitting: boolean }) => {
          return <LessonFields disabled={!isEdit || submitting} />
        }}
      </SimpleForm>
      <Paper style={{ marginTop: 16 }}>
        <PlayerLessonTable lesson={lesson} />
      </Paper>
    </>
  )
}

export default ViewLesson
