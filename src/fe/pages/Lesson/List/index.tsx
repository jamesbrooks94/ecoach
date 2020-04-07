import React from 'react'
import { useQuery } from 'fe/utils/apollo'
import { ALL_LESSONS } from 'fe/queries/lesson'
import { Typography } from '@material-ui/core'
import MaterialTable from 'material-table'
import history from 'fe/utils/history'
import urls from 'fe/urls'

interface ILesson {
  id: number
  name: string
}
interface ILessons {
  data: {
    allLessons?: ILesson[]
  }
}

const LessonList = () => {
  const {
    data: { allLessons = [] },
  }: ILessons = useQuery(ALL_LESSONS)
  console.log(allLessons)
  const actions = [
    { isFreeAction: true, icon: 'add', onClick: () => history.push(urls.lessons.create) },
  ]
  return (
    <>
      <Typography variant="h3" component="h2">
        All lessons
      </Typography>
      <MaterialTable
        title=""
        actions={actions}
        columns={[
          {
            title: 'id',
            field: 'id',
            hidden: true,
          },
          {
            title: 'Name',
            field: 'name',
          },
        ]}
        data={allLessons}
      />
    </>
  )
}

export default LessonList
