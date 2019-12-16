import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Product } from 'types/Packages'
import Table from 'atomics/Table'

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

const UnpackedProductsTableRow = styled.tr`
  cursor: pointer;
`

const UnpackedProductsList = ({ items, onPackProduct }) => (
  <UnpackedProductsTableContainer>
    <h3>Unpacked products</h3>
    <p>Click on the row to add product to currently selected package.</p>
    <Table>
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
            <UnpackedProductsTableRow
              key={i.id}
              onClick={() => onPackProduct(i)}
            >
              <td>{i.sku}</td>
              <td>{i.location}</td>
              <td>{i.quantity}</td>
            </UnpackedProductsTableRow>
          )
        })}
      </tbody>
    </Table>
  </UnpackedProductsTableContainer>
)

UnpackedProductsList.propTypes = {
  items: PropTypes.arrayOf(Product).isRequired,
  onPackProduct: PropTypes.func.isRequired
}

export default UnpackedProductsList
