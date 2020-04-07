import React from 'react'
import { TextField, Autocomplete, AutocompleteData, TimePicker } from 'mui-rff'
import { Grid } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import 'date-fns'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const autocompleteData: AutocompleteData[] = days.map(day => ({
  label: day,
  value: day.toUpperCase(),
}))

interface ILessonFieldProps {
  disabled?: boolean
}
const LessonFields: React.FC<ILessonFieldProps> = ({ disabled }) => (
  <>
    <Grid item xs={12} sm={6}>
      <TextField name="name" label="Lesson name" disabled={disabled} required={true} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField name="cost" label="Lesson cost" disabled={disabled} required={true} />
    </Grid>
    <Grid item xs={12} sm={4}>
      <Autocomplete
        label="Day"
        name="day"
        options={autocompleteData}
        getOptionValue={option => option.value}
        getOptionLabel={option => option.label}
        required={true}
        renderOption={({ label }) => <>{label}</>}
        disabled={disabled}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TimePicker
        label="Start time"
        name="startTime"
        required={true}
        dateFunsUtils={DateFnsUtils}
        disabled={disabled}
        minutesStep={5}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TimePicker
        label="End time"
        name="endTime"
        required={true}
        dateFunsUtils={DateFnsUtils}
        disabled={disabled}
        minutesStep={5}
      />
    </Grid>
  </>
)

export default LessonFields
