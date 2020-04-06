import gql from 'graphql-tag'

export const ALL_LESSONS = gql`
  query {
    allLessons {
      edges {
        node {
          createdAt
          createdBy
          days
          id
          name
          nodeId
          updatedAt
          updatedBy
          memberLessonsByLessonId {
            totalCount
          }
        }
      }
    }
  }
`
