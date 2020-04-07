import * as serviceWorker from './serviceWorker'
import { getAppConfig } from './fe/appConfig'
import { init, handleAuthCallback, checkSession } from './fe/utils/auth0'
import renderApp from './fe/renderApp'
import 'typeface-roboto'

const bootstrap = async () => {
  const config = await getAppConfig()
  await init(config)

  handleAuthCallback()
  try {
    await checkSession()
    renderApp(config)
  } catch (e) {}

  console.log(config)

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister()
}
bootstrap()
