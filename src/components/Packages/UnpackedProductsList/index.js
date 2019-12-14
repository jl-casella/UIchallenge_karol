import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Product } from 'types/Packages'

const UnpackedProductsTableContainer = styled.header`
  width: 50%;
  padding: 20px;
  border-right: 1px solid grey;
`

const UnpackedProductsList = ({ items, onRemoveProduct }) => (
  <UnpackedProductsTableContainer>
    <h3>Unpacked products</h3>
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Location</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {items.map(i => {
          return (
            <tr key={i.id} onClick={() => onRemoveProduct(i.id)}>
              <td>{i.sku}</td>
              <td>{i.location}</td>
              <td>{i.quantity}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </UnpackedProductsTableContainer>
)

UnpackedProductsList.propTypes = {
  items: PropTypes.arrayOf(Product).isRequired,
  onRemoveProduct: PropTypes.func.isRequired
}

export default UnpackedProductsList
