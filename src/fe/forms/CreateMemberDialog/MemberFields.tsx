import React from 'react'
import { Grid } from '@material-ui/core'
import { TextField } from 'mui-rff'

interface IMemberFields {
  disabled?: boolean
}
const MemberFields: React.FC<IMemberFields> = ({ disabled }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField label="First name" name="firstName" required disabled={disabled} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Surname" name="surname" required disabled={disabled} />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Email" name="email" required disabled={disabled} />
      </Grid>
    </Grid>
  )
}

export default MemberFields
