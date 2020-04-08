import React from 'react'
import SimpleForm from 'fe/forms/Simple'
import { RouteComponentProps, Link } from 'react-router-dom'
import { useQuery, useMutation } from 'fe/utils/apollo'
import { GET_LESSON, UPDATE_LESSON } from 'fe/queries/lesson'
import { Typography, Paper, Grid, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import urls from 'fe/urls'
import PlayerLessonTable from './PlayerLessonTable'
import LessonFields from 'fe/forms/CreateLessonDialog/helpers/LessonFields'
import { ILesson } from 'fe/interfaces/lesson'

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

  const onSubmit = ({ name, startTime, endTime, day, cost }: any) => {
    if (isEdit) {
      const input = { name, startTime, endTime, day, cost }
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
          <Typography variant="h4">Lesson - {lesson.name}</Typography>
        </Grid>
        {!isEdit && (
          <Grid item>
            <IconButton to={urls.lessons.edit(id)} component={Link}>
              <EditIcon color="primary" />
            </IconButton>
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
        <PlayerLessonTable lesson={lesson} refetch={refetch} />
      </Paper>
    </>
  )
}

export default ViewLesson
