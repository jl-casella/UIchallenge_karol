import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Product } from '../types'
import Table from 'atomics/Table'

const ProductsTableRow = styled.tr`
  cursor: pointer;
`

const LocationHeaderCell = styled.th`
  width: 100px;
`

const QuantityHeaderCell = styled.th`
  text-align: right;
  width: 50px;
`

const QuantityCell = styled.td`
  text-align: right;
`

const ProductsTable = ({ items, onProductRowClick }) => (
  <Table>
    <thead>
      <tr>
        <th>SKU</th>
        <LocationHeaderCell>Location</LocationHeaderCell>
        <QuantityHeaderCell>Quantity</QuantityHeaderCell>
      </tr>
    </thead>
    <tbody>
      {items.map(i => {
        return (
          <ProductsTableRow key={i.id} onClick={() => onProductRowClick(i)}>
            <td>{i.sku}</td>
            <td>{i.location}</td>
            <QuantityCell>{i.quantity}</QuantityCell>
          </ProductsTableRow>
        )
      })}
    </tbody>
  </Table>
)

ProductsTable.propTypes = {
  items: PropTypes.arrayOf(Product).isRequired,
  onProductRowClick: PropTypes.func.isRequired
}

export default ProductsTable
