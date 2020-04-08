import React from 'react'
import { useAuthContext } from 'fe/context/auth'
import { useQuery, useMutation } from 'fe/utils/apollo'
import { ALL_MEMBERS, CREATE_MEMBER } from 'fe/queries/members'
import MaterialTable from 'material-table'
import DialogForm from 'fe/forms/Dialog'
import AddIcon from '@material-ui/icons/Add'
import { Grid } from '@material-ui/core'
import { TextField } from 'mui-rff'
import { Link } from 'react-router-dom'
import urls from 'fe/urls'

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

  const [createUser]: any = useMutation(CREATE_MEMBER, refetch)
  const onSubmit = (variables: { firstName: string; surname: string }) => {
    createUser({
      variables: {
        input: {
          ...variables,
          fullName: `${variables.firstName} ${variables.surname}`,
          application: tenant,
        },
      },
    })
  }

  const actions = [
    {
      isFreeAction: true,
      icon: () => (
        <DialogForm trigger={<AddIcon />} onSubmit={onSubmit}>
          {() => {
            return (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="First name" name="firstName" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Surname" name="surname" required />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Email" name="email" required />
                </Grid>
              </Grid>
            )
          }}
        </DialogForm>
      ),
    },
  ] as any

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
