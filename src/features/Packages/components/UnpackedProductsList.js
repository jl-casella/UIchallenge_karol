import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Product } from '../types'
import ProductsTable from './ProductsTable'

const UnpackedProductsTableContainer = styled.section`
  padding: 20px;

  @media (max-width: 800px) {
    width: 100%;
    border-bottom: 1px solid gray;
  }

  @media (min-width: 800px) {
    width: 50%;
    border-right: 1px solid grey;
  }
`

const UnpackedProductsList = ({ items, onPackProduct }) => (
  <UnpackedProductsTableContainer>
    <h3>Unpacked Products</h3>
    {items.length === 0 ? (
      <p>There are no unpacked items.</p>
    ) : (
      <>
        <p>Click on the row to add product to currently selected package.</p>
        <ProductsTable
          items={items}
          onProductRowClick={p => onPackProduct(p)}
        />
      </>
    )}
  </UnpackedProductsTableContainer>
)

UnpackedProductsList.propTypes = {
  items: PropTypes.arrayOf(Product).isRequired,
  onPackProduct: PropTypes.func.isRequired
}

export default UnpackedProductsList
