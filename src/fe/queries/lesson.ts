import gql from 'graphql-tag'

export const ALL_LESSONS = gql`
  query($tenant: Int!) {
    allLessons(condition: { application: $tenant }) {
      edges {
        node {
          id
          cost
          day
          endTime
          name
          startTime

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
      cost
      day
      endTime
      name
      startTime
      lessonMembers: memberLessonsByLessonId {
        edges {
          node {
            id
            member: memberByMemberId {
              id
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
      clientMutationId
    }
  }
`

export const CREATE_MEMBER_LESSON = gql`
  mutation($lessonId: Int!, $memberId: Int!) {
    createMemberLesson(input: { memberLesson: { lessonId: $lessonId, memberId: $memberId } }) {
      clientMutationId
    }
  }
`

export const DELETE_MEMBER_LESSON = gql`
  mutation($id: Int!) {
    deleteMemberLessonById(input: { id: $id }) {
      clientMutationId
    }
  }
`
