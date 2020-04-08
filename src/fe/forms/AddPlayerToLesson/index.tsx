import React from 'react'
import DialogForm from 'fe/forms/Dialog'
import AddIcon from '@material-ui/icons/Add'
import { Autocomplete } from 'mui-rff'
import { Grid, Checkbox } from '@material-ui/core'
import { useMutation } from 'fe/utils/apollo'
import { CREATE_MEMBER_LESSON, DELETE_MEMBER_LESSON } from 'fe/queries/lesson'
import uniq from 'lodash/uniq'
import { ILesson } from 'fe/interfaces/lesson'
import { IMember } from 'fe/interfaces/member'

// tslint:disable-next-line
interface IAddPlayerToLessonProps {
  members: IMember[]
  lesson: ILesson
  refetch: Function
}

const AddPlayerToLesson: React.FC<IAddPlayerToLessonProps> = ({ refetch, members, lesson }) => {
  const [createMemberLesson]: any = useMutation(CREATE_MEMBER_LESSON)
  const [deleteMemberLesson]: any = useMutation(DELETE_MEMBER_LESSON)

  const ids = uniq(lesson.lessonMembers.map(i => i.member.id))

  const onSubmit = async (variables: { players: number[] }) => {
    const playersToCreate = variables.players.filter(p => !ids.includes(p))

    const playersToRemove = lesson.lessonMembers.reduce(
      (acc, curr) => (variables.players.includes(curr.member.id) ? acc : [...acc, curr.id]),
      [] as number[]
    )
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
  }
  const autocompleteData =
    members.map((i: any) => ({
      label: `${i.firstName} ${i.surname}`,
      value: i.id,
    })) || []
  return (
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
  )
}

export default AddPlayerToLesson
