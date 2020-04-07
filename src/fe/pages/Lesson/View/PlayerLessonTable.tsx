import React, { useState } from 'react'
import { ILesson } from '../List'
import MaterialTable from 'material-table'

import DialogForm from 'fe/forms/Dialog'
import AddIcon from '@material-ui/icons/Add'

interface IPlayerLessonProps {
  lesson: ILesson
}
const PlayerLessonTable: React.FC<IPlayerLessonProps> = ({ lesson }) => {
  const [open] = useState(false)
  const actions = [
    {
      isFreeAction: true,
      icon: () => <DialogForm trigger={<AddIcon />}>{() => <>Hi</>}</DialogForm>,
      onClick: () => null,
    },
  ]
  const columns = [{ title: 'name', field: 'member.fullName' }]
  return (
    <>
      <MaterialTable
        columns={columns}
        actions={actions}
        title="Players in this lesson"
        data={lesson.lessonMembers}
      />
      <DialogForm toggleOpen={open} />
    </>
  )
}

export default PlayerLessonTable
