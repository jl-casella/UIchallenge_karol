import { noop } from 'lodash'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import ProductsTable from '../ProductsTable'

describe('ProductsTable component test', () => {
  const productsMock = [
    {
      id: 1,
      quantity: 5,
      sku: 'green-ball',
      location: 'a1'
    },
    {
      id: 2,
      quantity: 6,
      sku: 'red-ball',
      location: 'a2'
    }
  ]

  it('Should render correctly', () => {
    const { container } = render(
      <ProductsTable items={productsMock} onProductRowClick={noop} />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('Calls onRowClick handler after clicking on the row', () => {
    const spy = jest.fn()
    const { getByText } = render(
      <ProductsTable items={productsMock} onProductRowClick={spy} />
    )

    const skuCell = getByText('green-ball')
    const locationCell = getByText('a1')
    const quantityCell = getByText('5')
    expect(spy).toHaveBeenCalledTimes(0)

    fireEvent.click(skuCell)
    fireEvent.click(locationCell)
    fireEvent.click(quantityCell)
    expect(spy).toHaveBeenCalledTimes(3)
  })
})
