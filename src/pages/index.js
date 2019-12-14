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

  return (
    <>
      <UnpackedProductsList
        items={productManagerInterface.products}
        onRemoveProduct={productManagerInterface.removeProduct}
      />
      <PackagesPanel
        packages={packageManagerInterface.packages}
        onAddPackage={packageManagerInterface.addPackage}
        activePackageId={packageManagerInterface.activePackageId}
        setActivePackageId={packageManagerInterface.setActivePackageId}
        removeProductFromPackage={
          packageManagerInterface.removeProductFromPackage
        }
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
