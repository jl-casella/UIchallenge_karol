import { noop } from 'lodash'
import React from 'react'
import { render, waitForElement } from '@testing-library/react'

import PackageContent from '../PackageContent'

describe('PackageContent component test', () => {
  it('Should render correctly when package is empty', async () => {
    const { getByText } = render(
      <PackageContent products={[]} onUnpackProduct={noop} />
    )

    await waitForElement(() => getByText('Package is empty.'))
  })

  it('Should render correctly when package is not empty', async () => {
    const productsMock = [
      {
        id: 1,
        quantity: 5,
        sku: 'green-ball',
        location: 'a1'
      }
    ]

    const { getByText } = render(
      <PackageContent products={productsMock} onUnpackProduct={noop} />
    )

    await waitForElement(() =>
      getByText('Click on the row to unpack the item.')
    )
  })
})
