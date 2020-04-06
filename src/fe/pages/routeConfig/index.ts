import urls from '../../urls'
import Index from '../Index'
import LessonList from '../Lesson/List'
interface IRouteConfig {
  [key: string]: () => JSX.Element | Element
}
const routeConfig: IRouteConfig = {
  [urls.root]: Index,
  [urls.lessons.list]: LessonList,
}

export default routeConfig
