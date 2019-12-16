import { noop } from 'lodash'
import React from 'react'
import { render } from '@testing-library/react'

import PackagesList from '../PackagesList'

describe('PackagesList component test', () => {
  it('Should render correctly', () => {
    const packagesMock = [
      { id: 'test', items: [] },
      { id: 'test2', items: [] }
    ]

    const { container } = render(
      <PackagesList
        packages={packagesMock}
        activePackage={undefined}
        setActivePackageId={noop}
        removePackage={noop}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
