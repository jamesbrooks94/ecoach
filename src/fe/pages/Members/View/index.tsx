import React from 'react'
import MemberFields from 'fe/forms/CreateMemberDialog/MemberFields'
import SimpleForm from 'fe/forms/Simple'
import { RouteComponentProps, Link } from 'react-router-dom'
import { useQuery, useMutation } from 'fe/utils/apollo'
import { GET_MEMBER, UPDATE_MEMBER } from 'fe/queries/members'
import { Paper, Typography, Grid, IconButton } from '@material-ui/core'
import { IMember } from 'fe/interfaces/member'
import MemberLessonTable from './MemberLessonTable'
import urls from 'fe/urls'
import EditIcon from '@material-ui/icons/Edit'

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
  const [update]: any = useMutation(UPDATE_MEMBER, refetch)

  if (!member) return null

  const totalCost = member.memberLessons
    .reduce((acc, curr) => acc + Number(curr.lesson.cost), 0)
    .toFixed(2)
  const onSubmit = ({ firstName, surname, email }: any) => {
    update({
      variables: {
        id: ~~id,
        input: { firstName, surname, email },
      },
    })
  }

  return (
    <>
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="h4">
            {member.fullName} - Total: £{totalCost}
          </Typography>
        </Grid>
        {!isEdit && (
          <Grid item>
            <IconButton to={urls.members.edit(id)} component={Link}>
              <EditIcon color="primary" />
            </IconButton>
          </Grid>
        )}
      </Grid>
      <SimpleForm
        withPaper={false}
        onSubmit={onSubmit}
        initialValues={member}
        showCancel={!!isEdit}
        showSubmit={!!isEdit}
        redirectOnSubmit={urls.members.view(id)}
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
