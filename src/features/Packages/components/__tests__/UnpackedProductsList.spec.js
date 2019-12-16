import { noop } from 'lodash'
import React from 'react'
import { render, waitForElement } from '@testing-library/react'

import UnpackedProductsList from '../UnpackedProductsList'

describe('UnpackedProductsList component test', () => {
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

  it('Should render correctly with no products', async () => {
    const { getByText } = render(
      <UnpackedProductsList items={[]} onPackProduct={noop} />
    )

    await waitForElement(() => [
      getByText('Unpacked Products'),
      getByText('There are no unpacked items.')
    ])
  })

  it('Should render correctly with products', async () => {
    const { getByText } = render(
      <UnpackedProductsList items={productsMock} onPackProduct={noop} />
    )

    await waitForElement(() => [
      getByText('Unpacked Products'),
      getByText(
        'Click on the row to add product to currently selected package.'
      )
    ])
  })
})
