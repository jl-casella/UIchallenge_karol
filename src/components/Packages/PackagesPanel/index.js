import React from 'react'
import styled from 'styled-components'

import PackageContent from '../PackageContent'
import PackageTab from '../PackageTab'

const PackagesSectionContainer = styled.header`
  width: 50%;
  padding: 20px;
`

const PackagesPanel = () => (
  <PackagesSectionContainer>
    <h3>Packed Products</h3>
    <button>Add Package</button>
    <hr />
    <PackageTab number={1} />
    <PackageTab active number={2} />
    <PackageTab number={3} />
    <PackageTab number={4} />
    <PackageContent />
  </PackagesSectionContainer>
)

export default PackagesPanel
