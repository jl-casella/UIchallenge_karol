import { noop } from 'lodash'
import React from 'react'
import { render, waitForElement } from '@testing-library/react'

import PackagesPanel from '../PackagesPanel'

describe('PackagesPanel component test', () => {
  it('Should render correctly', async () => {
    const { getByText } = render(
      <PackagesPanel
        packages={[]}
        onAddPackage={noop}
        activePackageId={undefined}
        setActivePackageId={noop}
        onUnpackProduct={noop}
        onRemovePackage={noop}
        remainingProducts={0}
        onShipPackages={noop}
      />
    )

    await waitForElement(() => getByText('Packed Products'))
  })
})
