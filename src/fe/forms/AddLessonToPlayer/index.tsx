import * as React from 'react'
import DialogForm from '../Dialog'
import { ILessonsApiResponse } from 'fe/interfaces/lesson'
import { IMember } from 'fe/interfaces/member'
import { useQuery, useMutation } from 'fe/utils/apollo'
import { ALL_LESSONS, CREATE_MEMBER_LESSON, DELETE_MEMBER_LESSON } from 'fe/queries/lesson'
import { useAuthContext } from 'fe/context/auth'
import AddIcon from '@material-ui/icons/Add'
import uniq from 'lodash/uniq'
import { Grid, Checkbox } from '@material-ui/core'
import { Autocomplete } from 'mui-rff'
import { formatTime } from 'fe/utils/time'

interface IAddLessonToPlayerProps {
  refetch: Function
  member: IMember
}

const AddLessonToPlayer: React.FC<IAddLessonToPlayerProps> = ({ member, refetch }) => {
  const { tenant } = useAuthContext()
  const {
    data: { allLessons = [] },
  }: ILessonsApiResponse = useQuery(ALL_LESSONS, { variables: { tenant } })
  const [createMemberLesson]: any = useMutation(CREATE_MEMBER_LESSON)
  const [deleteMemberLesson]: any = useMutation(DELETE_MEMBER_LESSON)

  const ids = uniq(member.memberLessons.map(i => i.lesson.id))

  const onSubmit = async (variables: { lessons: number[] }) => {
    const lessonsToCreate = variables.lessons.filter(lesson => !ids.includes(lesson))

    const lessonsToRemove = member.memberLessons.reduce(
      (acc, curr) => (variables.lessons.includes(curr.lesson.id) ? acc : [...acc, curr.id]),
      [] as number[]
    )

    await Promise.all([
      ...lessonsToCreate.map(l =>
        createMemberLesson({
          variables: {
            lessonId: l,
            memberId: member.id,
          },
        })
      ),
      ...lessonsToRemove.map(l => deleteMemberLesson({ variables: { id: l } })),
    ])

    refetch()
  }
  const autocompleteData = allLessons.map(lesson => ({
    label: `${lesson.name} - ${lesson.day} ${formatTime(lesson.startTime)}-${formatTime(
      lesson.endTime
    )}`,
    value: lesson.id,
  }))
  return (
    <DialogForm onSubmit={onSubmit} trigger={<AddIcon />} initialValues={{ lessons: ids }}>
      {({ submitting }: { submitting: boolean }) => (
        <Grid container>
          <Grid item xs={12}>
            <Autocomplete
              label="Lessons"
              name="lessons"
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

export default AddLessonToPlayer
