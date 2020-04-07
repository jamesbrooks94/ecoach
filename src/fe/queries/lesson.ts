import gql from 'graphql-tag'

export const ALL_LESSONS = gql`
  query($tenant: Int!) {
    allLessons(condition: { application: $tenant }) {
      edges {
        node {
          day
          id
          name
          startTime
          endTime

          members: memberLessonsByLessonId {
            totalCount
          }
        }
      }
    }
  }
`

export const CREATE_LESSON = gql`
  mutation createLesson($input: LessonInput!) {
    createLesson(input: { lesson: $input }) {
      clientMutationId
    }
  }
`
export const GET_LESSON = gql`
  query($id: Int!) {
    lesson: lessonById(id: $id) {
      id
      name
      endTime
      day
      startTime
      lessonMembers: memberLessonsByLessonId {
        edges {
          node {
            id
            member: memberByMemberId {
              firstName
              fullName
              surname
            }
          }
        }
      }
    }
  }
`
export const UPDATE_LESSON = gql`
  mutation($id: Int!, $input: LessonPatch!) {
    updateLessonById(input: { id: $id, lessonPatch: $input }) {
      lesson {
        id
      }
    }
  }
`
