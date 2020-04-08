import React from 'react'
import MemberFields from 'fe/forms/CreateMemberDialog/MemberFields'
import SimpleForm from 'fe/forms/Simple'
import { RouteComponentProps } from 'react-router-dom'
import { useQuery } from 'fe/utils/apollo'
import { GET_MEMBER } from 'fe/queries/members'
import { Paper, Typography } from '@material-ui/core'
import { IMember } from 'fe/interfaces/member'
import MemberLessonTable from './MemberLessonTable'

interface IViewMember extends RouteComponentProps<{ id: string }> {
  isEdit?: boolean
}

interface IViewMemberResponse {
  data: {
    member?: IMember
  }
  refetch: Function
}
const ViewMember: React.FC<IViewMember> = ({
  isEdit,
  match: {
    params: { id },
  },
}) => {
  const {
    data: { member },
    refetch,
  }: IViewMemberResponse = useQuery(GET_MEMBER, { variables: { id: ~~id } })

  if (!member) return null

  const totalCost = member.memberLessons.reduce((acc, curr) => acc + Number(curr.lesson.cost), 0)

  return (
    <>
      <Typography variant="h4">
        Member - {member.fullName} - total: £{totalCost}
      </Typography>
      <SimpleForm
        withPaper={false}
        onSubmit={() => null}
        initialValues={member}
        showCancel={!!isEdit}
        showSubmit={!!isEdit}
      >
        {() => {
          return <MemberFields disabled={!isEdit} />
        }}
      </SimpleForm>
      <Paper style={{ marginTop: 16 }}>
        <MemberLessonTable member={member} refetch={refetch} />
      </Paper>
    </>
  )
}

export default ViewMember
