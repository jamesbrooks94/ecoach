import React from 'react'
import { useAuthContext } from 'fe/context/auth'
import { useMutation } from 'fe/utils/apollo'
import { CREATE_MEMBER } from 'fe/queries/members'
import DialogForm from 'fe/forms/Dialog'
import AddIcon from '@material-ui/icons/Add'
import MemberFields from './MemberFields'

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
        return <MemberFields />
      }}
    </DialogForm>
  )
}
export default CreateMemberDialog
