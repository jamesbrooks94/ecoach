import React from 'react'
import { useAuthContext } from 'fe/context/auth'
import { useMutation } from 'fe/utils/apollo'
import { CREATE_MEMBER } from 'fe/queries/members'
import DialogForm from 'fe/forms/Dialog'
import AddIcon from '@material-ui/icons/Add'
import { Grid } from '@material-ui/core'
import { TextField } from 'mui-rff'

interface ICreateMemberDialog {
  refetch: Function
}
const CreateMemberDialog: React.FC<ICreateMemberDialog> = ({ refetch }) => {
  const { tenant } = useAuthContext()
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
  return (
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
  )
}
export default CreateMemberDialog
