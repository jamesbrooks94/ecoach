import React from 'react'
import urls from '../../urls'
import LessonList from '../Lesson/List'
import ViewLesson from '../Lesson/View'
import MemberList from '../Members/List'
import ViewMember from '../Members/View'
import CreateEmailTemplate from '../Email/Create'

const routeConfig: any = {
  [urls.root]: LessonList,
  [urls.lessons.list]: LessonList,
  [urls.lessons.view()]: ViewLesson,
  [urls.lessons.edit()]: (props: any) => <ViewLesson {...props} isEdit />,
  [urls.members.list]: MemberList,
  [urls.members.view()]: ViewMember,
  [urls.members.edit()]: (props: any) => <ViewMember {...props} isEdit />,
  [urls.emailTemplate.create]: CreateEmailTemplate,
}

export default routeConfig
