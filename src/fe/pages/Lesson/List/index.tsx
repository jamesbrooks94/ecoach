import React from 'react'
import { useQuery } from 'fe/utils/apollo'
import { ALL_LESSONS } from 'fe/queries/lesson'
import { Typography } from '@material-ui/core'
import MaterialTable from 'material-table'
import history from 'fe/utils/history'
import urls from 'fe/urls'
import { useAuthContext } from 'fe/context/auth'
import { Link } from 'react-router-dom'

export interface ILesson {
  id: number
  name: string
  day: string
  startTime: any
  endTime: any
  lessonMembers: any[]
}

interface ILessons {
  data: {
    allLessons?: ILesson[]
  }
}

const LessonList = () => {
  const { tenant } = useAuthContext()
  const {
    data: { allLessons = [] },
  }: ILessons = useQuery(ALL_LESSONS, { variables: { tenant } })
  const actions = [
    { isFreeAction: true, icon: 'add', onClick: () => history.push(urls.lessons.create) },
  ]
  return (
    <>
      <Typography variant="h4" component="h2">
        All lessons
      </Typography>
      <MaterialTable
        title=""
        actions={actions}
        columns={[
          {
            title: 'id',
            field: 'id',
            hidden: true,
          },
          {
            title: 'Name',
            field: 'name',
            render: ({ id, name }: ILesson) => <Link to={urls.lessons.view(id)}>{name}</Link>,
          },
          {
            title: 'Day',
            field: 'day',
          },
          {
            title: 'Start time',
            field: 'startTime',
            render: ({ startTime }) => {
              const d = new Date(startTime)
              return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
            },
          },
          {
            title: 'End time',
            field: 'endTime',
            render: ({ endTime }) => {
              const d = new Date(endTime)
              return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
            },
          },
          {
            title: 'Players',
            field: 'members.totalCount',
          },
        ]}
        data={allLessons}
      />
    </>
  )
}

export default LessonList
