import React from 'react'
import { useAuthContext } from 'fe/context/auth'
import { useQuery } from 'fe/utils/apollo'
import { ALL_MEMBERS } from 'fe/queries/members'
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom'
import urls from 'fe/urls'
import CreateMemberDialog from 'fe/forms/CreateMemberDialog'
import { IMemberListData } from 'fe/interfaces/member'

const MemberList = () => {
  const { tenant } = useAuthContext()
  const {
    data: { allMembers = [] },
    refetch,
  }: IMemberListData = useQuery(ALL_MEMBERS, { variables: { tenant } })

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
      title="All members"
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
