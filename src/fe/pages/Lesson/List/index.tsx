import React from 'react'
import { useQuery } from 'fe/utils/apollo'
import { ALL_LESSONS } from 'fe/queries/lesson'
import MaterialTable from 'material-table'
import urls from 'fe/urls'
import { useAuthContext } from 'fe/context/auth'
import { Link } from 'react-router-dom'
import CreateLessonDialog from 'fe/forms/CreateLessonDialog'
import { ILesson, ILessonsApiResponse } from 'fe/interfaces/lesson'

const LessonList = () => {
  const { tenant } = useAuthContext()
  const {
    data: { allLessons = [] },
    refetch,
  }: ILessonsApiResponse = useQuery(ALL_LESSONS, { variables: { tenant } })
  const actions = [
    {
      isFreeAction: true,
      icon: () => <CreateLessonDialog refetch={refetch} />,
      onClick: () => null,
    },
  ]
  return (
    <MaterialTable
      title="All lessons"
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
            return `${d
              .getHours()
              .toString()
              .padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
          },
        },
        {
          title: 'End time',
          field: 'endTime',
          render: ({ endTime }) => {
            const d = new Date(endTime)
            return `${d
              .getHours()
              .toString()
              .padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
          },
        },
        {
          title: 'Players',
          field: 'members.totalCount',
        },
      ]}
      data={allLessons}
    />
  )
}

export default LessonList
