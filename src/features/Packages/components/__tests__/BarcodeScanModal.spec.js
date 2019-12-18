import { noop } from 'lodash'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import BarcodeScanModal from '../BarcodeScanModal'

describe('BarcodeScanModal component test', () => {
  const productsMock = [
    {
      id: 1,
      quantity: 5,
      sku: 'green-ball',
      location: 'a1'
    },
    {
      id: 99,
      quantity: 2,
      sku: 'green-ball',
      location: 'a4'
    }
  ]
  it('Should render correctly', () => {
    const { container } = render(
      <BarcodeScanModal
        onModalClose={noop}
        products={[]}
        onPackProduct={noop}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('Should call close callback after clicking "Cancel" button', () => {
    const spy = jest.fn()
    const { getByText } = render(
      <BarcodeScanModal onModalClose={spy} products={[]} onPackProduct={noop} />
    )

    const cancelButton = getByText('Cancel')
    expect(spy).toHaveBeenCalledTimes(0)

    fireEvent.click(cancelButton)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Should call onPack callback with valid after clicking on a row', () => {
    const spy = jest.fn()
    const { getByText } = render(
      <BarcodeScanModal
        onModalClose={noop}
        products={productsMock}
        onPackProduct={spy}
      />
    )

    const firstRow = getByText('a1')
    expect(spy).toHaveBeenCalledTimes(0)

    fireEvent.click(firstRow)
    expect(spy).toHaveBeenCalledTimes(1)

    const spyCallArgs = spy.mock.calls[0]
    expect(spyCallArgs.length).toBe(1)
    expect(spyCallArgs[0].id).toBe(1)
    expect(spyCallArgs[0].quantity).toBe(5)
    expect(spyCallArgs[0].sku).toBe('green-ball')
    expect(spyCallArgs[0].location).toBe('a1')
  })

  it('Should call close callback after selecting valid row', () => {
    const spy = jest.fn()
    const { getByText } = render(
      <BarcodeScanModal
        onModalClose={spy}
        products={productsMock}
        onPackProduct={noop}
      />
    )

    const firstRow = getByText('a1')
    expect(spy).toHaveBeenCalledTimes(0)

    fireEvent.click(firstRow)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
