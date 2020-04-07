import React from 'react'
import PropTypes from 'prop-types'
import { FORM_ERROR } from 'final-form'
import { Form as FinalForm } from 'react-final-form'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import history from 'fe/utils/history'
import styles from './styles'

interface IFormProps {
  children: any
  initialValues?: object
  onCancel?: Function
  onSubmit: Function
  redirectOnSubmit?: string
  resetOnSubmit?: boolean
  resetLabel?: string
  resetOnSubmbut?: boolean
  showCancel?: boolean
  showSubmit?: boolean
  submitComponent?: string | JSX.Element
  disabled?: boolean
}

const Form: React.FC<ISimpleFormProps> = ({
  children,
  initialValues,
  onCancel,
  onSubmit,
  redirectOnSubmit,
  resetLabel,
  resetOnSubmit,
  showCancel = true,
  showSubmit = true,
  submitComponent,
  disabled,
}) => {
  const classes = styles()
  const submit = async (values: any, form: any) => {
    let error
    try {
      const { error: e } = (await onSubmit(values, { form })) || {}
      error = e
    } catch (e) {
      error = e
    }
    if (error) {
      return { [FORM_ERROR]: 'form.error.generic.action' }
    } else {
      resetOnSubmit && setTimeout(form.reset)
      redirectOnSubmit && history.push(redirectOnSubmit)
    }
  }

  const cancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      window.history.back()
    }
  }

  return (
    <FinalForm
      onSubmit={submit}
      initialValues={initialValues}
      subscription={{ submitting: true, values: true, pristine: true }}
    >
      {formProps => (
        <form onSubmit={formProps.handleSubmit}>
          <Grid container spacing={1}>
            {formProps.submitError && (
              <Grid item sm={12}>
                <Typography align="center" color="error">
                  {formProps.submitError}
                </Typography>
              </Grid>
            )}

            {children && children(formProps)}

            <Grid item sm={12}>
              <Grid container justify="space-between">
                <div>
                  {resetLabel && (
                    <Button
                      type="button"
                      color="primary"
                      variant="contained"
                      className={classes.button}
                      onClick={formProps.form.reset}
                      disabled={disabled}
                    >
                      {resetLabel}
                    </Button>
                  )}

                  {showCancel && (
                    <Button
                      type="reset"
                      color="primary"
                      onClick={cancel}
                      variant="contained"
                      className={classes.button}
                    >
                      Cancel />
                    </Button>
                  )}
                  {showSubmit && (
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      className={classes.button}
                      disabled={formProps.submitting || formProps.pristine || disabled}
                    >
                      {submitComponent || 'Submit'}
                    </Button>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </FinalForm>
  )
}

interface ISimpleFormProps extends IFormProps {
  withPaper?: boolean
}

const SimpleForm: React.FC<ISimpleFormProps> = ({ withPaper = true, ...props }) => {
  const classes = styles()
  if (!withPaper) {
    return <Form {...props} />
  }
  return (
    <Paper className={classes.paper}>
      <Form {...props} />
    </Paper>
  )
}

export default SimpleForm
