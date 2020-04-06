import React from 'react'
import { useQuery } from 'fe/utils/apollo'
import { ALL_LESSONS } from 'fe/queries/lesson'
import { Typography } from '@material-ui/core'

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
  return (
    <>
      <Typography variant="h3" component="h2">
        All lessons
      </Typography>
    </>
  )
}

export default LessonList
