import PropTypes from 'prop-types'
import React from 'react'

import { getUnpackedProducts } from 'services/api'
import PackagesPanel from 'components/Packages/PackagesPanel'
import UnpackedProductsList from 'components/Packages/UnpackedProductsList'
import useProductManager from 'hooks/Packages/useProductManager'
import usePackageManager from 'hooks/Packages/usePackageManager'

const Index = ({ unpackedProducts }) => {
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
    [packageManagerInterface.activePackageId, productManagerInterface.products]
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
        items={productManagerInterface.products}
        onPackProduct={onPackProduct}
      />
      <PackagesPanel
        packages={packageManagerInterface.packages}
        onAddPackage={packageManagerInterface.addPackage}
        activePackageId={packageManagerInterface.activePackageId}
        setActivePackageId={packageManagerInterface.setActivePackageId}
        onUnpackProduct={onUnpackProduct}
      />
    </>
  )
}

Index.propTypes = {
  unpackedProducts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}

Index.getInitialProps = async () => {
  const unpackedProducts = await getUnpackedProducts()
  return { unpackedProducts }
}

export default Index
