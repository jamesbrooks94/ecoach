import * as React from 'react'
import DialogForm from '../Dialog'
import { ILessonsApiResponse } from 'fe/interfaces/lesson'
import { IMember } from 'fe/interfaces/member'
import { useQuery } from 'fe/utils/apollo'
import { ALL_LESSONS } from 'fe/queries/lesson'
import { useAuthContext } from 'fe/context/auth'
import AddIcon from '@material-ui/icons/Add'

interface IAddLessonToPlayerProps {
  refetch: Function
  member: IMember
}

const AddLessonToPlayer: React.FC<IAddLessonToPlayerProps> = ({ member, refetch }) => {
  const { tenant } = useAuthContext()
  const {
    data: { allLessons = [] },
  }: ILessonsApiResponse = useQuery(ALL_LESSONS, { variables: { tenant } })
  console.log(allLessons, member, refetch)
  const onSubmit = (variables: any) => console.log(variables)
  return (
    <DialogForm onSubmit={onSubmit} trigger={<AddIcon />}>
      {() => {
        return <>Hi</>
      }}
    </DialogForm>
  )
}

export default AddLessonToPlayer
