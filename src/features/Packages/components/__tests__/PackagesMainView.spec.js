import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'

import PackagesMainView from '../PackagesMainView'

describe('PackagesMainView component test', () => {
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

  it('Should render correctly', async () => {
    const { getByText } = render(
      <PackagesMainView unpackedProducts={productsMock} />
    )

    await waitForElement(() => [
      getByText('Unpacked Products'),
      getByText('Packed Products')
    ])
  })

  it('Adds product to newly created package after clicking on the unpacked row', async () => {
    const { getByText, getAllByText } = render(
      <PackagesMainView unpackedProducts={productsMock} />
    )

    const newPackageButton = getByText('Add Package')
    fireEvent.click(newPackageButton)
    await waitForElement(() => getByText('Package 1'))

    const productElementsBefore = getAllByText('green-ball')
    expect(productElementsBefore).toHaveLength(1)

    fireEvent.click(productElementsBefore[0])
    const productElementsAfter = getAllByText('green-ball')
    expect(productElementsAfter).toHaveLength(2)
  })

  it('Removes product from the package after clicking on the unpacked row', async () => {
    const { getByText, getAllByText } = render(
      <PackagesMainView unpackedProducts={productsMock} />
    )

    const newPackageButton = getByText('Add Package')
    fireEvent.click(newPackageButton)
    await waitForElement(() => getByText('Package 1'))

    const productElement = getByText('green-ball')
    fireEvent.click(productElement)
    const productElementsBefore = getAllByText('green-ball')
    fireEvent.click(productElementsBefore[1])
    const productElementsAfter = getAllByText('green-ball')

    expect(productElementsAfter).toHaveLength(1)
  })
})
