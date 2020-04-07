import { Component } from 'react'

interface IToggleProps {
  toggleOpen?: boolean
  children: any
}
class Toggle extends Component<IToggleProps> {
  unmounting: boolean = false

  state = { open: this.props.toggleOpen || false }

  componentWillUnmount = () => (this.unmounting = true)

  toggle = (event: any) => {
    event && event.stopPropagation()
    !this.unmounting && this.setState({ open: !this.state.open })
  }

  render() {
    return this.props.children({ open: this.state.open, toggle: this.toggle })
  }
}

export default Toggle
