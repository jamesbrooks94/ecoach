import React from 'react'
import urls from '../../urls'
import LessonList from '../Lesson/List'
import CreateLesson from '../Lesson/Create'
import ViewLesson from '../Lesson/View'

const routeConfig: any = {
  [urls.root]: LessonList,
  [urls.lessons.list]: LessonList,
  [urls.lessons.create]: CreateLesson,
  [urls.lessons.view()]: ViewLesson,
  [urls.lessons.edit()]: (props: any) => <ViewLesson {...props} isEdit />,
}

export default routeConfig
