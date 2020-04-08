import React from 'react'

import MaterialTable from 'material-table'
import { IMember } from 'fe/interfaces/member'
import { ILesson } from 'fe/interfaces/lesson'
import { Link } from 'react-router-dom'
import urls from 'fe/urls'
import AddLessonToPlayer from 'fe/forms/AddLessonToPlayer'
import { formatTime } from 'fe/utils/time'

interface IMemberLessonTableProps {
  member: IMember
  refetch: Function
}

const MemberLessonTable: React.FC<IMemberLessonTableProps> = ({ member, refetch }) => {
  const lessons = member.memberLessons.map(({ lesson }) => lesson)
  const actions = [
    {
      isFreeAction: true,
      onClick: () => false,
      icon: () => <AddLessonToPlayer refetch={refetch} member={member} />,
    },
  ]
  const columns = [
    {
      title: 'Lesson',
      field: 'name',
      render: ({ name, id }: ILesson) => <Link to={urls.lessons.view(id)}>{name}</Link>,
    },
    {
      title: 'Day',
      field: 'day',
    },
    {
      title: 'Cost',
      field: 'cost',
    },
    {
      title: 'Start time',
      field: 'startTime',
      render: ({ startTime }: ILesson) => formatTime(startTime),
    },
    {
      title: 'End time',
      field: 'endTime',
      render: ({ endTime }: ILesson) => formatTime(endTime),
    },
  ]
  return <MaterialTable actions={actions} title="Lessons" data={lessons} columns={columns} />
}

export default MemberLessonTable
