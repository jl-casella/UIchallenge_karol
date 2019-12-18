import { noop } from 'lodash'
import React from 'react'
import { fireEvent, render, waitForElement } from '@testing-library/react'

import PackagesActionsBar from '../PackagesActionsBar'

describe('PackagesActionsBar component test', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <PackagesActionsBar
        onAddPackage={noop}
        shippingEnabled={false}
        onShipPackages={noop}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('Should call onAdd callback after clicking "Add Package" button', () => {
    const spy = jest.fn()
    const { getByText } = render(
      <PackagesActionsBar
        onAddPackage={spy}
        shippingEnabled={false}
        onShipPackages={noop}
      />
    )

    const addButton = getByText('Add Package')
    expect(spy).toHaveBeenCalledTimes(0)

    fireEvent.click(addButton)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Should call onShip callback after clicking "Ship!" button when shipping enabled', () => {
    const spy = jest.fn()
    const { getByText } = render(
      <PackagesActionsBar
        onAddPackage={noop}
        shippingEnabled={true}
        onShipPackages={spy}
      />
    )

    const shipButton = getByText('Ship!')
    expect(spy).toHaveBeenCalledTimes(0)

    fireEvent.click(shipButton)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Should not call onShip callback after clicking "Ship!" button when shipping disabled', () => {
    const spy = jest.fn()
    const { getByText } = render(
      <PackagesActionsBar
        onAddPackage={noop}
        shippingEnabled={false}
        onShipPackages={spy}
      />
    )

    const shipButton = getByText('Ship!')
    expect(spy).toHaveBeenCalledTimes(0)

    fireEvent.click(shipButton)
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('Shows information tooltip after hovering over "Ship!" button when shipping disabled', async () => {
    const { getByText } = render(
      <PackagesActionsBar
        onAddPackage={noop}
        shippingEnabled={false}
        onShipPackages={noop}
      />
    )

    const shipButton = getByText('Ship!')
    fireEvent.mouseOver(shipButton)

    await waitForElement(() =>
      getByText('In order to ship packages, all items must be packed')
    )
  })
})
