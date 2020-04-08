import React from 'react'
import { useAuthContext } from 'fe/context/auth'
import { useQuery } from 'fe/utils/apollo'
import { ALL_MEMBERS } from 'fe/queries/members'
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom'
import urls from 'fe/urls'
import CreateMemberDialog from 'fe/forms/CreateMemberDialog'

interface IMember {
  id: string
  firstName: string
  surname: string
  fullName: string
  lessons: any[]
}

interface IMemberData {
  data: {
    allMembers?: IMember[]
  }
  refetch: Function
}

const MemberList = () => {
  const { tenant } = useAuthContext()
  const {
    data: { allMembers = [] },
    refetch,
  }: IMemberData = useQuery(ALL_MEMBERS, { variables: { tenant } })

  const actions = [
    {
      isFreeAction: true,
      icon: () => <CreateMemberDialog refetch={refetch} />,
      onClick: () => null,
    },
  ]

  return (
    <MaterialTable
      actions={actions}
      columns={[
        {
          title: 'Name',
          field: 'fullName',
          render: ({ id, fullName }) => <Link to={urls.members.view(id)}>{fullName}</Link>,
        },
        { title: 'Number of lessons', field: 'lessons.totalCount' },
      ]}
      data={allMembers}
    />
  )
}

export default MemberList
