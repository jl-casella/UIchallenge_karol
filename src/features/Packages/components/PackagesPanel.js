import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Package } from '../types'
import PackageContent from './PackageContent'
import PackagesActionsBar from './PackagesActionsBar'
import PackagesList from './PackagesList'

const PackagesSectionContainer = styled.section`
  padding: 20px;

  @media (max-width: 800px) {
    width: 100%;
  }

  @media (min-width: 800px) {
    width: 50%;
  }
`

const PackagesPanel = ({
  packages,
  onAddPackage,
  activePackageId,
  setActivePackageId,
  onUnpackProduct,
  onRemovePackage,
  onShipPackages,
  remainingProducts
}) => {
  const activePackageItems = React.useMemo(() => {
    const selectedPackage = packages.find(p => p.id === activePackageId)
    return selectedPackage ? selectedPackage.items : []
  }, [packages, activePackageId])

  return (
    <PackagesSectionContainer>
      <h3>Packed Products</h3>
      <PackagesActionsBar
        onAddPackage={onAddPackage}
        onShipPackages={onShipPackages}
        shippingEnabled={remainingProducts === 0 && packages.length > 0}
      />
      <hr />
      <PackagesList
        packages={packages}
        activePackageId={activePackageId}
        setActivePackageId={setActivePackageId}
        removePackage={onRemovePackage}
      />
      {activePackageId !== undefined && (
        <PackageContent
          packageId={activePackageId}
          products={activePackageItems}
          onUnpackProduct={onUnpackProduct}
        />
      )}
    </PackagesSectionContainer>
  )
}

PackagesPanel.propTypes = {
  packages: PropTypes.arrayOf(Package).isRequired,
  onAddPackage: PropTypes.func.isRequired,
  activePackageId: PropTypes.string,
  setActivePackageId: PropTypes.func.isRequired,
  onUnpackProduct: PropTypes.func.isRequired,
  onRemovePackage: PropTypes.func.isRequired,
  remainingProducts: PropTypes.number.isRequired,
  onShipPackages: PropTypes.func.isRequired
}

export default PackagesPanel