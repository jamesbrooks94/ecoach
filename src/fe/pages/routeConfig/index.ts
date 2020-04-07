import urls from '../../urls'
import Index from '../Index'
import LessonList from '../Lesson/List'
import CreateLesson from '../Lesson/Create'
interface IRouteConfig {
  [key: string]: () => JSX.Element | Element
}
const routeConfig: IRouteConfig = {
  [urls.root]: Index,
  [urls.lessons.list]: LessonList,
  [urls.lessons.create]: CreateLesson,
}

export default routeConfig
