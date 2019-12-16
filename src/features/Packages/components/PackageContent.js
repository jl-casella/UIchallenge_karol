import PropTypes from 'prop-types'
import React from 'react'

import { Product } from '../types'
import ProductsTable from './ProductsTable'

const PackageContent = ({ products, onUnpackProduct }) => {
  return products.length > 0 ? (
    <>
      <p>Click on the row to unpack the item.</p>
      <ProductsTable
        items={products}
        onProductRowClick={p => onUnpackProduct(p)}
      />
    </>
  ) : (
    <p>Package is empty.</p>
  )
}

PackageContent.propTypes = {
  products: PropTypes.arrayOf(Product).isRequired,
  onUnpackProduct: PropTypes.func.isRequired
}

export default PackageContent
