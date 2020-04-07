import React from 'react'
import { Form } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import Toggle from 'fe/components/Toggle'

const DialogForm = ({ showSubmitButton = true, ...props }) => {
  const submit = (closeModal: any) => async (values: any, form: any) => {
    const { onSubmit, closeModalOnSubmit } = props
    const { error } = (await onSubmit(values, { form, closeModal })) || {}

    if (error) {
      return { [FORM_ERROR]: 'form.error.generic.action' }
    } else {
      closeModalOnSubmit && closeModal()
    }
  }

  const close = (toggle: any) => (event: any) => {
    stopPropagation(event)
    props.onClose && props.onClose()
    toggle()
  }

  const clearOrReset = (action: any, clear: boolean) => () => {
    if (clear) {
      props.onClear && props.onClear()
    } else {
      props.onReset && props.onReset()
    }
    // NOTE: Having {} or undefined works differently:
    // {} - changes forms values to empty {}, meaning it `clears` form
    // undefined - changes forms values to initialValues, meaning it `resets` form
    action(clear ? {} : undefined)
  }
  const stopPropagation = (event: any) => event && event.stopPropagation()

  const renderDialog = (onClose: any) => {
    const { children, dialog, initialValues, buttons = {}, testId, title, disabled, form } = props
    const clearOrResetLabel = buttons.clear || buttons.reset

    const style: CSSProperties = props.overflowVisible ? { overflowY: 'visible' } : {}

    return (
      <Dialog
        {...dialog}
        open
        fullWidth
        onClose={onClose}
        onClick={stopPropagation}
        PaperProps={{ style }}
      >
        {title && <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>}
        <Form
          {...form}
          onSubmit={submit(onClose)}
          initialValues={initialValues}
          subscription={{ submitting: true, values: true, submitError: true }}
        >
          {formProps => (
            <form onSubmit={formProps.handleSubmit} data-testid={testId}>
              {formProps.submitError && (
                <Grid item sm={12}>
                  <Typography align="center" color="error">
                    {formProps.submitError}
                  </Typography>
                </Grid>
              )}

              <DialogContent style={style}>
                <Grid container spacing={1}>
                  {children && children({ ...formProps, closeModal: onClose })}
                </Grid>
              </DialogContent>

              <DialogActions>
                <Button color="primary" onClick={onClose} disabled={formProps.submitting}>
                  {buttons.cancel || 'Cancel'}
                </Button>

                {clearOrResetLabel && (
                  <Button
                    color="primary"
                    onClick={clearOrReset(formProps.form.reset, !!buttons.clear)}
                    disabled={formProps.submitting}
                  >
                    {clearOrResetLabel}
                  </Button>
                )}

                {showSubmitButton && (
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={formProps.submitting || disabled}
                  >
                    {buttons.submit || 'Submit'}
                  </Button>
                )}
              </DialogActions>
            </form>
          )}
        </Form>
      </Dialog>
    )
  }

  return (
    <Toggle toggleOpen={props.toggleOpen}>
      {({ open, toggle }: { open: boolean; toggle: any }) => {
        const onClose = close(toggle)
        return (
          <>
            <span onClick={onClose}>{props.trigger}</span>
            {open && renderDialog(onClose)}
          </>
        )
      }}
    </Toggle>
  )
}

DialogForm.defaultProps = {
  closeModalOnSubmit: true,
  disabled: false,
}

DialogForm.propTypes = {
  overflowVisible: PropTypes.bool,
  closeModalOnSubmit: PropTypes.bool,
  testId: PropTypes.string,
  dialog: PropTypes.object,
  initialValues: PropTypes.object,
  children: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  trigger: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  buttons: PropTypes.shape({
    cancel: PropTypes.string,
    clear: PropTypes.string,
    reset: PropTypes.string,
    submit: PropTypes.string,
  }),
}

export default DialogForm
