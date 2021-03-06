import React from 'react'
import { shallow } from 'enzyme'

import Select from '../index'

describe('<Select />', () => {
  const props = {
    id: 'select-test',
    options: [
      {
        value: 'value1',
        name: 'Value 1',
      },
      {
        value: 'value2',
        name: 'Value 2',
      },
    ],
  }
  const shallowRender = (localProps = props) => shallow(<Select {...localProps} />)

  it('should render the component correctly', () => {
    const renderedComponent = shallowRender()
    expect(renderedComponent).toBeTruthy()
    expect(renderedComponent.find('option').length).toEqual(3)
    expect(renderedComponent.find('option').at(0).props().value).toEqual('')
    expect(renderedComponent.find('option').at(1).props().value).toEqual('value1')
    expect(renderedComponent.find('option').at(2).props().value).toEqual('value2')
  })

  it('should call onChange prop function when triggering select onChange', () => {
    const localProps = {
      ...props,
      onChange: jest.fn(),
    }
    const event = { target: { value: '2' } }
    const renderedComponent = shallowRender(localProps)
    renderedComponent.find('select').simulate('change', event)
    expect(localProps.onChange).toHaveBeenCalledWith('2', localProps.id)
  })
})
