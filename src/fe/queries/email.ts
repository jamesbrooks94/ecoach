import gql from 'graphql-tag'

export const CREATE_EMAIL = gql`
  mutation($input: EmailTemplateInput!) {
    createEmailTemplate(input: { emailTemplate: $input }) {
      clientMutationId
    }
  }
`

export const UPDATE_EMAIL = gql`
  mutation($id: Int!, $input: EmailTemplatePatch!) {
    updateEmailTemplateById(input: { id: $id, emailTemplatePatch: $input }) {
      clientMutationId
    }
  }
`

export const GET_EMAIL = gql`
  query($id: Int!) {
    application: applicationById(id: $id) {
      id
      templates: emailTemplatesByApplication {
        edges {
          node {
            id
            name
            subject
            content
          }
        }
      }
    }
  }
`
