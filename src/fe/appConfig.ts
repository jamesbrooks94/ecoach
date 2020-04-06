// export const getAppConfig = async () => {
//   const response = await fetch(`/config`)
//   const json = await response.json()
//   return json
// }
let config: any = null

const loadConfig = async () => {
  const response = await fetch(`/config`)
  config = await response.json()
}

export const getAppConfig = async () => {
  if (!config) await loadConfig()
  return config
}
