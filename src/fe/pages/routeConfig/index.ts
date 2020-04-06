import urls from '../../urls'
import Index from '../Index'
interface IRouteConfig {
  [key: string]: () => JSX.Element | Element
}
const routeConfig: IRouteConfig = {
  [urls.root]: Index,
}

export default routeConfig
