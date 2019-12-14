import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Product } from 'types/Packages'

const PackageContentList = styled.table`
  padding: 50px;
  width: 100%;
`

const PackageContent = ({ products, onUnpackProduct }) => (
  <PackageContentList>
    <thead>
      <tr>
        <th>SKU</th>
        <th>Quantity</th>
        <th>Location</th>
      </tr>
    </thead>

    <tbody>
      {products.map(p => {
        return (
          <tr key={p.id} onClick={() => onUnpackProduct(p)}>
            <td>{p.sku}</td>
            <td>{p.quantity}</td>
            <td>{p.location}</td>
          </tr>
        )
      })}
    </tbody>
  </PackageContentList>
)

PackageContent.propTypes = {
  products: PropTypes.arrayOf(Product).isRequired,
  onUnpackProduct: PropTypes.func.isRequired
}

export default PackageContent
