import { notifcationSettings } from '../notistack'

export const cleanNames = name => name.filter(item => item !== '__typename')

// This will remove all edges/nodes etc
export const cleanNamesAndReturnData = data => {
  if (!data) return data
  const dataType = Array.isArray(data) ? [] : {}
  const cleanedNames = cleanNames(getArrayOrKeysFromObject(data))
  return cleanedNames.reduce((acc, cur) => {
    if (Array.isArray(acc)) {
      acc.push(cur)
    } else {
      acc[cur] = data[cur]
    }
    return acc
  }, dataType)
}

export const checkForDeepEdges = data => {
  if (!data) return
  return Object.keys(data).reduce((acc, cur) => {
    if (acc === true) return acc
    if (typeof cur === 'string' && cur === 'edges') return true
    if (typeof data[cur] === 'object') acc = hasEdges(data[cur])
    return acc
  }, false)
}

export const hasEdges = data => {
  if (!data) return
  if (Object.keys(data)[0] === 'edges') return true
  if (Array.isArray(data) && data[0] !== 'edges') return checkForDeepEdges(data)
  const isObjectWithData = !Array.isArray(data) && Object.keys(data) && Object.keys(data).length > 1
  if (isObjectWithData) return checkForDeepEdges(data)
  if (Array.isArray(data)) return data.includes('edges')
  return false
}

export const isEdge = data => data === 'edges'

export const isNode = data => data === 'nodes'

export const isNotStringOrNumberOrBoolean = data => {
  return !(typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean')
}

export const getArrayOrKeysFromObject = data => {
  return data.length ? data : Object.keys(data)
}

export const removeNode = data => cleanNamesAndReturnData(data.node)

export const cleanNodes = data => {
  const cleanedNode = data.map(item => removeNode(item))
  return cleanedNode
}

export const cleanData = data => {
  if (!data) return null
  const iterableData = getArrayOrKeysFromObject(cleanNamesAndReturnData(data))
  return iterableData.reduce((acc, cur) => {
    if (isNode(cur)) {
      acc = data[cur].length ? data[cur] : getArrayOrKeysFromObject(data[cur])
    } else if (isEdge(cur)) {
      acc = cleanNodes(data[cur])
    } else if (hasEdges(data[cur])) {
      acc[cur] = cleanData(data[cur])
    } else if (isNotStringOrNumberOrBoolean(data[cur])) {
      acc[cur] = cleanNamesAndReturnData(data[cur])
    } else {
      acc[cur] = data[cur]
    }

    if (Array.isArray(acc) && acc[0] && typeof acc[0] === 'object' && hasEdges(acc)) {
      acc = acc.reduce((acc2, cur2) => {
        acc2.push(cleanData(cur2))
        return acc2
      }, [])
    }
    return acc
  }, {})
}

export default class transformDataClass {
  constructor(props) {
    this.data = props
  }

  start = (previousData = {}) => {
    let returnData = {}
    const contents = this.data ? getArrayOrKeysFromObject(this.data) : null
    if (contents === null || !contents.length) return returnData
    return contents.reduce((acc, item) => {
      if (previousData[item]) {
        acc[item] = previousData[item]
        return acc
      }
      const currentItem = this.data[item]
      if (Array.isArray(currentItem)) {
        returnData = currentItem.reduce((currentAcc, currentCur) => {
          currentAcc.push(cleanNamesAndReturnData(currentCur))
          return currentAcc
        }, [])
      } else {
        returnData = cleanData(currentItem)
      }
      acc[item] = returnData
      return acc
    }, returnData)
  }
}

export const sortParams = function (params) {
  return params.slice(1).reduce((acc, cur) => {
    if (!acc.refetch) acc.refetch = typeof cur === 'function' ? cur : null
    if (!acc.options) acc.options = typeof cur === 'object' ? cur : null
    return acc
  }, {})
}

export const hookLogger = (enqueueSnackbar, error) => {
  const isDev = process.env.NODE_ENV === 'development'
  // eslint-disable-next-line no-console
  console.error(error)

  if (isDev) {
    enqueueSnackbar(error.toString(), {
      ...notifcationSettings,
      variant: 'error',
    })
  } else {
    enqueueSnackbar('generic.error', {
      ...notifcationSettings,
      variant: 'warning',
    })
  }
}
