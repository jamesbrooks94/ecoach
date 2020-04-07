import React from 'react'
import SimpleForm from 'fe/forms/Simple'
import { TextField, Autocomplete, AutocompleteData } from 'mui-rff'
import { Checkbox as MuiCheckbox, Grid } from '@material-ui/core'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const autocompleteData: AutocompleteData[] = days.map(day => ({ label: day, value: day }))

const CreateLesson = () => {
  return (
    <>
      Create lesson
      <SimpleForm onSubmit={(values: any) => console.log(values)} initialValues={{ planet: [] }}>
        {() => {
          return (
            <Grid container>
              <Grid item xs={12}>
                <TextField name="name" label="Lesson name" />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  label="Pick at least one planet"
                  name="planet"
                  options={autocompleteData}
                  getOptionValue={option => option.value}
                  getOptionLabel={option => option.label}
                  disableCloseOnSelect={true}
                  renderOption={(option, { selected }) => (
                    <>
                      <MuiCheckbox
                        style={{ marginRight: 8 }}
                        checked={selected}
                        size="small"
                        disableRipple
                      />
                      {option.label}
                    </>
                  )}
                  multiple
                />
              </Grid>
            </Grid>
          )
        }}
      </SimpleForm>
    </>
  )
}

export default CreateLesson
