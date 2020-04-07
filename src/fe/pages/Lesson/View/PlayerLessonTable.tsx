import React from 'react'
import { ILesson } from '../List'
import MaterialTable from 'material-table'

import DialogForm from 'fe/forms/Dialog'
import AddIcon from '@material-ui/icons/Add'
import { Autocomplete } from 'mui-rff'
import { Grid, Checkbox } from '@material-ui/core'
import { useQuery, useMutation } from 'fe/utils/apollo'
import { GET_USERS } from 'fe/queries/users'
import { useAuthContext } from 'fe/context/auth'
import { CREATE_MEMBER_LESSON, DELETE_MEMBER_LESSON } from 'fe/queries/lesson'
import uniq from 'lodash/uniq'
interface IPlayerLessonProps {
  lesson: ILesson
  refetch: Function
}
const PlayerLessonTable: React.FC<IPlayerLessonProps> = ({ lesson, refetch }) => {
  const { tenant } = useAuthContext()
  const {
    data: { applicationById },
  }: any = useQuery(GET_USERS, { variables: { tenant } })
  const [createMemberLesson]: any = useMutation(CREATE_MEMBER_LESSON)
  const [deleteMemberLesson]: any = useMutation(DELETE_MEMBER_LESSON)

  if (!applicationById) return null

  const autocompleteData =
    applicationById.members.map((i: any) => ({
      label: `${i.firstName} ${i.surname}`,
      value: i.id,
    })) || []
  const ids = uniq(lesson.lessonMembers.map(i => i.member.id))

  const onSubmit = async (variables: { players: number[] }) => {
    console.log('variables', variables)
    const playersToCreate = variables.players.filter(p => !ids.includes(p))
    const playersToRemove = lesson.lessonMembers.reduce(
      (acc, curr) => (variables.players.includes(curr.member.id) ? acc : [...acc, curr.id]),
      [] as number[]
    )
    console.log(playersToRemove)
    await Promise.all([
      ...playersToCreate.map((player: number) =>
        createMemberLesson({
          variables: {
            lessonId: lesson.id,
            memberId: player,
          },
        })
      ),
      ...playersToRemove.map(player => deleteMemberLesson({ variables: { id: player } })),
    ])
    refetch()

    console.log(variables)
  }
  const actions = autocompleteData.length
    ? [
        {
          isFreeAction: true,
          icon: () => (
            <DialogForm onSubmit={onSubmit} trigger={<AddIcon />} initialValues={{ players: ids }}>
              {({ submitting }: { submitting: boolean }) => (
                <Grid container>
                  <Grid item xs={12}>
                    <Autocomplete
                      label="Players"
                      name="players"
                      options={autocompleteData}
                      getOptionValue={option => option.value}
                      getOptionLabel={option => option.label}
                      disableCloseOnSelect={true}
                      multiple
                      renderOption={({ label }, { selected }) => (
                        <>
                          <Checkbox style={{ marginRight: 8 }} checked={selected} size="small" />
                          {label}
                        </>
                      )}
                      disabled={submitting}
                    />
                  </Grid>
                </Grid>
              )}
            </DialogForm>
          ),
          onClick: () => null,
        },
      ]
    : undefined
  const columns = [{ title: 'Name', field: 'member.fullName' }]
  return (
    <>
      <MaterialTable
        columns={columns}
        actions={actions}
        title="Players in this lesson"
        data={lesson.lessonMembers}
      />
    </>
  )
}

export default PlayerLessonTable
