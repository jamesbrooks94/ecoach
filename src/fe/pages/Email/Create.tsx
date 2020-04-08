import React, { Component, useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import convert from 'textversionjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Grid } from '@material-ui/core'
import SimpleForm from 'fe/forms/Simple'
import { TextField } from 'mui-rff'
const CreateEmailTemplate = () => {
  const [state, setState] = useState<EditorState>(EditorState.createEmpty())
  const onChange = (editorState: any) => {
    setState(editorState)
  }
  const onSubmit = (variables: any) => {
    const contentHtml = draftToHtml(convertToRaw(state.getCurrentContent()))
    const contentPlain = convert(contentHtml)
    const data = {
      ...variables,
      contentHtml,
      contentPlain,
    }
    console.log(data)
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
