import Popup from 'reactjs-popup'
import PropTypes from 'prop-types'
import React from 'react'

import BarcodeScanModal from './BarcodeScanModal'
import PackagesPanel from './PackagesPanel'
import UnpackedProductsList from './UnpackedProductsList'
import useBarcodeScanner from '../hooks/useBarcodeScanner'
import usePackageManager from '../hooks/usePackageManager'
import useProductManager from '../hooks/useProductManager'

const PackagesMainView = ({ unpackedProducts }) => {
  const productManagerInterface = useProductManager(unpackedProducts)
  const packageManagerInterface = usePackageManager()

  const onPackProduct = product => {
    const { removeProduct } = productManagerInterface
    const { activePackageId, addProductToPackage } = packageManagerInterface

    if (activePackageId !== undefined) {
      removeProduct(product.id)
      addProductToPackage(product, activePackageId)
    }
  }

  const onUnpackProduct = product => {
    const { addProduct } = productManagerInterface
    const {
      activePackageId,
      removeProductFromPackage
    } = packageManagerInterface

    if (activePackageId !== undefined) {
      removeProductFromPackage(product.id, activePackageId)
      addProduct(product)
    }
  }

  const barcodeScannerInterface = useBarcodeScanner(
    productManagerInterface.sortedProducts,
    packageManagerInterface.activePackageId,
    onPackProduct
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
        remainingProducts={productManagerInterface.sortedProducts.length}
        onShipPackages={packageManagerInterface.shipPackages}
      />
      <Popup
        open={barcodeScannerInterface.isModalOpen}
        modal
        closeOnDocumentClick={false}
        contentStyle={{ width: '60%' }}
      >
        {close => {
          const onModalClose = () => {
            barcodeScannerInterface.onModalClose()
            close()
          }

          return (
            <BarcodeScanModal
              onModalClose={onModalClose}
              products={barcodeScannerInterface.availableChoices}
              onPackProduct={onPackProduct}
            />
          )
        }}
      </Popup>
    </>
  )
}

PackagesMainView.propTypes = {
  unpackedProducts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}

export default PackagesMainView
