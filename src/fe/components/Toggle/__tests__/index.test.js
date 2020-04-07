import React from 'react'
import { shallowWithIntl as shallow } from 'utils/testHelper'
import { act } from 'react-dom/test-utils'

import Toggle from '../'

describe('components | Toggle', () => {
  const RenderToggle = () => {
    const children = jest.fn()
    const component = shallow(<Toggle>{children}</Toggle>)
    const toggle = component.instance().toggle
    return { children, toggle }
  }

  it('executes children function on initial render and rerender', () => {
    const { children, toggle } = RenderToggle()

    expect(children).toBeCalledWith({ open: false, toggle })
    act(() => toggle())
    expect(children).toBeCalledWith({ open: true, toggle })
    act(() => toggle())
    expect(children).toBeCalledWith({ open: false, toggle })
  })
})
