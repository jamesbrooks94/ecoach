import gql from 'graphql-tag'

export const CREATE_MEMBER = gql`
  mutation($input: MemberInput!) {
    createMember(input: { member: $input }) {
      clientMutationId
    }
  }
`

export const ALL_MEMBERS = gql`
  query($tenant: Int!) {
    allMembers(condition: { application: $tenant }) {
      edges {
        node {
          id
          firstName
          surname
          fullName
          email
          lessons: memberLessonsByMemberId {
            totalCount
          }
        }
      }
    }
  }
`
export const GET_MEMBER = gql`
  query($id: Int!) {
    member: memberById(id: $id) {
      id
      firstName
      surname
      fullName
      email
      memberLessons: memberLessonsByMemberId {
        edges {
          node {
            lesson: lessonByLessonId {
              id
              name
              cost
              day
              startTime
              endTime
            }
          }
        }
      }
    }
  }
`
