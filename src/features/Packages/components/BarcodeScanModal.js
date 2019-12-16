import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Button from '../../../atomics/Button'
import Modal from 'atomics/Modal'
import { Product } from '../types'
import ProductsTable from './ProductsTable'

const ProductsTableShort = styled(ProductsTable)`
  width: 60%;
  margin: 20px auto 40px;
`

const BarcodeScanModalActionsBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`

const BarcodeScanModal = ({ products, onPackProduct, onModalClose }) => {
  const onAddProductToPackage = React.useCallback(product => {
    onPackProduct(product)
    onModalClose()
  }, [])

  return (
    <Modal title="Barcode scan ambiguous">
      <p>
        Multiple products matching the barcode scan detected. Select the one to
        add to current package.
      </p>
      <ProductsTableShort
        items={products}
        onProductRowClick={onAddProductToPackage}
      />
      <hr />
      <BarcodeScanModalActionsBar>
        <Button onClick={onModalClose}>Cancel</Button>
      </BarcodeScanModalActionsBar>
    </Modal>
  )
}

BarcodeScanModal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(Product).isRequired,
  onPackProduct: PropTypes.func.isRequired
}

export default BarcodeScanModal
