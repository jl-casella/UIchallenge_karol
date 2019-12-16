import PropTypes from 'prop-types'
import React from 'react'

import PackagesPanel from './PackagesPanel'
import UnpackedProductsList from './UnpackedProductsList'
import useProductManager from '../hooks/useProductManager'
import usePackageManager from '../hooks/usePackageManager'

const PackagesMainView = ({ unpackedProducts }) => {
  const productManagerInterface = useProductManager(unpackedProducts)
  const packageManagerInterface = usePackageManager()

  const onPackProduct = React.useCallback(
    product => {
      const { removeProduct } = productManagerInterface
      const { activePackageId, addProductToPackage } = packageManagerInterface

      if (activePackageId !== undefined) {
        removeProduct(product.id)
        addProductToPackage(product, activePackageId)
      }
    },
    [
      packageManagerInterface.activePackageId,
      productManagerInterface.sortedProducts
    ]
  )

  const onUnpackProduct = React.useCallback(
    product => {
      const { addProduct } = productManagerInterface
      const {
        activePackageId,
        removeProductFromPackage
      } = packageManagerInterface

      if (activePackageId !== undefined) {
        removeProductFromPackage(product.id, activePackageId)
        addProduct(product)
      }
    },
    [packageManagerInterface.activePackageId, packageManagerInterface.packages]
  )

  return (
    <>
      <UnpackedProductsList
        items={productManagerInterface.sortedProducts}
        onPackProduct={onPackProduct}
      />
      <PackagesPanel
        packages={packageManagerInterface.packages}
        onAddPackage={packageManagerInterface.addPackage}
        activePackageId={packageManagerInterface.activePackageId}
        setActivePackageId={packageManagerInterface.setActivePackageId}
        onRemovePackage={packageManagerInterface.removePackage}
        onUnpackProduct={onUnpackProduct}
      />
    </>
  )
}

PackagesMainView.propTypes = {
  unpackedProducts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}

export default PackagesMainView
