import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import PackageContent from '../PackageContent'
import PackageTab from '../PackageTab'
import { Package } from 'types/Packages'

const PackagesSectionContainer = styled.header`
  width: 50%;
  padding: 20px;
`

const PackagesPanel = ({
  packages,
  onAddPackage,
  activePackageId,
  setActivePackageId,
  removeProductFromPackage
}) => (
  <PackagesSectionContainer>
    <h3>Packed Products</h3>
    <button onClick={onAddPackage}>Add Package</button>
    <hr />
    {packages.map((_, i) => {
      return (
        <PackageTab
          key={i}
          number={i + 1}
          active={i === activePackageId}
          onClick={() => setActivePackageId(i)}
        />
      )
    })}
    {activePackageId < packages.length && (
      <PackageContent
        packageId={activePackageId}
        products={packages[activePackageId].items}
        onRemoveProductFromPackage={removeProductFromPackage}
      />
    )}
  </PackagesSectionContainer>
)

PackagesPanel.propTypes = {
  packages: PropTypes.arrayOf(Package).isRequired,
  onAddPackage: PropTypes.func.isRequired,
  activePackageId: PropTypes.number,
  setActivePackageId: PropTypes.func.isRequired,
  removeProductFromPackage: PropTypes.func.isRequired
}

export default PackagesPanel
