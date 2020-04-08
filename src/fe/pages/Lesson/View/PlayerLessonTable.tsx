import React from 'react'
import MaterialTable from 'material-table'
import { useQuery } from 'fe/utils/apollo'
import { GET_USERS } from 'fe/queries/users'
import { useAuthContext } from 'fe/context/auth'
import { ILesson, ILessonMember } from 'fe/interfaces/lesson'
import { Link } from 'react-router-dom'
import urls from 'fe/urls'
import { IMember } from 'fe/interfaces/member'
import AddPlayerToLesson from 'fe/forms/AddPlayerToLesson'

interface IPlayerLessonProps {
  lesson: ILesson
  refetch: Function
}

interface IApplication {
  members: IMember[]
}
interface IApplicationResponse {
  data: {
    applicationById?: IApplication
  }
}
const PlayerLessonTable: React.FC<IPlayerLessonProps> = ({ lesson, refetch }) => {
  const { tenant } = useAuthContext()
  const {
    data: { applicationById },
  }: IApplicationResponse = useQuery(GET_USERS, { variables: { tenant } })

  if (!applicationById) return null

  const actions = applicationById.members.length
    ? [
        {
          isFreeAction: true,
          icon: () => (
            <AddPlayerToLesson
              refetch={refetch}
              lesson={lesson}
              members={applicationById.members}
            />
          ),
          onClick: () => null,
        },
      ]
    : undefined
  const columns = [
    {
      title: 'Name',
      field: 'member.fullName',
      render: ({ member }: ILessonMember) => (
        <Link to={urls.members.view(member.id)}>{member.fullName}</Link>
      ),
    },
    { title: 'Email', field: 'member.email' },
  ]
  return (
    <MaterialTable
      columns={columns}
      actions={actions}
      title="Players in this lesson"
      data={lesson.lessonMembers}
    />
  )
}

export default PlayerLessonTable
