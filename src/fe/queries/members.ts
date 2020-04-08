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
          lessons: memberLessonsByMemberId {
            totalCount
          }
        }
      }
    }
  }
`
