import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Product } from 'types/Packages'
import Table from 'atomics/Table'

const PackageContentList = styled(Table)`
  padding: 50px;
`

const PackageContentTableRow = styled.tr`
  cursor: pointer;
`

const PackageContent = ({ products, onUnpackProduct }) => {
  return products.length > 0 ? (
    <>
      <p>Click on the row to unpack the item.</p>
      <PackageContentList>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Location</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => {
            return (
              <PackageContentTableRow
                key={p.id}
                onClick={() => onUnpackProduct(p)}
              >
                <td>{p.sku}</td>
                <td>{p.location}</td>
                <td>{p.quantity}</td>
              </PackageContentTableRow>
            )
          })}
        </tbody>
      </PackageContentList>
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
