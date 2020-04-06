import {
  cleanNames,
  cleanNamesAndReturnData,
  checkForDeepEdges,
  hasEdges,
  isEdge,
  isNode,
  isNotStringOrNumberOrBoolean,
  getArrayOrKeysFromObject,
  removeNode,
  cleanNodes,
} from '../apollo.class'
import data from './testData.json'

describe('Apollo | Apollo Class', function() {
  describe('cleanNames', function() {
    it('Cleaning names of __typename', function() {
      const typename = ['__typename']
      const dirtyNames = ['jamie', 'hutber', ...typename]
      const expected = cleanNames(dirtyNames)
      expect(expected).toEqual(expect.not.arrayContaining(typename))
    })
  })

  describe('cleanNamesAndReturnData', function() {
    it('Returns `data` if no data is set', () => {
      const expected = cleanNamesAndReturnData(null)
      expect(expected).toBeNull()
    })
  })

  describe('checkForDeepEdges', function() {
    it('Make sure we return TRUE when we have `edges` present', () => {
      const [, , { data: currentData }] = data
      const expected = checkForDeepEdges(currentData)
      expect(expected).toBeTruthy()
    })

    it('Make sure we return FALSE when no `edges` are present', () => {
      const [, { data: currentData }] = data
      const expected = checkForDeepEdges(currentData)
      expect(expected).toBeFalsy()
    })

    it('Make sure we return FALSE when no data is present', () => {
      const expected = checkForDeepEdges()
      expect(expected).toBeFalsy()
    })
  })

  describe('hasEdges', function() {
    const [
      ,
      ,
      {
        data: {
          locationSet,
          locationSet: {
            teamMembers,
            teamMembers: { edges },
          },
        },
      },
    ] = data

    it('null | UNDEFINED when no paramaters are provided', () => {
      const expected = hasEdges()
      expect(expected).toBeUndefined()
    })
    it('Object | with edge at root', () => {
      const expected = hasEdges(teamMembers)
      expect(expected).toBeTruthy()
    })
    it('Object | with nested edge', () => {
      const expected = hasEdges(locationSet)
      expect(expected).toBeTruthy()
    })
    it('Array | with edge as a named property at root', () => {
      const expected = hasEdges(teamMembers)
      expect(expected).toBeTruthy()
    })
    it('Array | with edge as nested property', () => {
      const expected = hasEdges(edges)
      expect(expected).toBeTruthy()
    })
  })

  describe('isEdge', function() {
    it('is an edge', () => {
      const expected = isEdge('edges')
      expect(expected).toBeTruthy()
    })
    it('is not an edge', () => {
      const expected = isEdge('Not an edge')
      expect(expected).toBeFalsy()
    })
    it('is not an edge with other data type', () => {
      const expected = isEdge(['Not an edge'])
      expect(expected).toBeFalsy()
    })
  })

  describe('isNode', function() {
    it('is a nodes', () => {
      const expected = isNode('nodes')
      expect(expected).toBeTruthy()
    })
    it('is not a nodes', () => {
      const expected = isNode('Not an nodes')
      expect(expected).toBeFalsy()
    })
    it('is not a nodes with other data type', () => {
      const expected = isNode(['Not an nodes'])
      expect(expected).toBeFalsy()
    })
  })

  describe('isNotStringOrNumberOrBoolean', function() {
    it('should return FALSE if a string', function() {
      const expected = isNotStringOrNumberOrBoolean('A String')
      expect(expected).toBeFalsy()
    })
    it('should return FALSE if Number ', function() {
      const expected = isNotStringOrNumberOrBoolean(1984)
      expect(expected).toBeFalsy()
    })
    it('should return FALSE if Boolean', function() {
      const expected = isNotStringOrNumberOrBoolean(true)
      expect(expected).toBeFalsy()
    })
    it('should return TRUE if array', function() {
      const expected = isNotStringOrNumberOrBoolean([])
      expect(expected).toBeTruthy()
    })
    it('should return TRUE if Object', function() {
      const expected = isNotStringOrNumberOrBoolean({})
      expect(expected).toBeTruthy()
    })
    it('should return TRUE if null', function() {
      const expected = isNotStringOrNumberOrBoolean(null)
      expect(expected).toBeTruthy()
    })
  })

  describe('getArrayOrKeysFromObject', function() {
    const [, { data: arrayObjectData }] = data
    it('An array should return an array', () => {
      const testData = ['jamie', 'hutuber', 'pul one random other day']
      const expected = getArrayOrKeysFromObject(testData)
      expect(expected).toBe(testData)
    })
    it('An object should return an array', () => {
      const testData = 'tasks'
      const expected = getArrayOrKeysFromObject(arrayObjectData)
      expect(expected).toContain(testData)
    })
  })

  describe('removeNode', function() {
    it('should remove node', function() {
      const testData = {
        node: {
          id: 1,
          team: {
            id: 1,
            name: 'SSA 1',
            teamMembers: {
              edges: [],
              __typename: 'TeamMembersConnection',
            },
            __typename: 'Team',
          },
          __typename: 'LocationSetTeam',
        },
        __typename: 'LocationSetTeamsEdge',
      }
      const expected = removeNode(testData)
      const toMatch = {
        id: 1,
        team: {
          id: 1,
          name: 'SSA 1',
          teamMembers: { edges: [], __typename: 'TeamMembersConnection' },
          __typename: 'Team',
        },
      }

      expect(expected).toMatchObject(toMatch)
    })
  })

  describe('cleanNodes', function() {
    it('should remove all `nodes` from array', function() {
      const testData = [
        {
          node: {
            id: 1,
          },
        },
        {
          node: {
            id: 2,
          },
        },
      ]
      const toMatch = [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ]
      const expected = cleanNodes(testData)
      expect(expected).toMatchObject(toMatch)
    })
  })
})
