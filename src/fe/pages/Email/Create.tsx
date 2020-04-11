import React, { useState } from 'react'
import { EditorState, convertToRaw, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import convert from 'textversionjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Grid } from '@material-ui/core'
import SimpleForm from 'fe/forms/Simple'
import { TextField } from 'mui-rff'
import { useMutation, useQuery } from 'fe/utils/apollo'
import { CREATE_EMAIL, GET_EMAIL, UPDATE_EMAIL } from 'fe/queries/email'
import { useAuthContext } from 'fe/context/auth'

const CreateEmailTemplate = () => {
  const [state, setState] = useState<EditorState>(EditorState.createEmpty())
  const { tenant } = useAuthContext()

  const {
    data: {
      application: { templates = [] },
    },
    loading,
    refetch,
    ...other
  }: any = useQuery(GET_EMAIL, { variables: { id: tenant } })
  const [create]: any = useMutation(CREATE_EMAIL, refetch)
  const [update]: any = useMutation(UPDATE_EMAIL, refetch)

  if (loading) return null

  const template = templates[0]
  console.log(other)
  console.log(template)
  const onChange = (editorState: any) => {
    console.log(editorState)
    setState(editorState)
  }

  const onSubmit = (variables: any) => {
    const contentHtml = draftToHtml(convertToRaw(state.getCurrentContent()))

    if (!template) {
      create({
        variables: {
          input: {
            ...variables,
            content: contentHtml,
            application: tenant,
          },
        },
      })
    } else {
      update({
        variables: {
          id: template.id,
          input: {
            ...variables,
            content: contentHtml,
          },
        },
      })
    }
  }
  return (
    <div>
      <SimpleForm onSubmit={onSubmit}>
        {() => {
          return (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField name="name" label="Name" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="subject" label="Subject" />
              </Grid>
              <Editor
                editorState={state}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                editorStyle={{
                  border: '1px solid #e4e4e4',
                  borderRadius: '3px',
                  padding: '0 16px',
                }}
                onEditorStateChange={onChange}
              />
            </Grid>
          )
        }}
      </SimpleForm>
    </div>
  )
}

// class EditorConvertToHTML extends Component {
//   state = {
//     editorState: EditorState.createEmpty(),
//   }

//   onEditorStateChange = editorState => {
//     this.setState({
//       editorState,
//     })
//   }

//   render() {
//     const { editorState } = this.state
//     return (
//       <div>
//         <Editor
//           editorState={editorState}
//           wrapperClassName="demo-wrapper"
//           editorClassName="demo-editor"
//           onEditorStateChange={this.onEditorStateChange}
//         />
//         <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} />
//       </div>
//     )
//   }
// }

export default CreateEmailTemplate
