import React from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'

const PackageContentList = styled.table`
  padding: 50px;
  width: 100%;
`

const PackageContent = () => (
  <PackageContentList>
    <thead>
      <tr>
        <th>name</th>
        <th>quantity</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>Green Ball</td>
        <td>2</td>
      </tr>

      <tr>
        <td>Blue Ball</td>
        <td>2</td>
      </tr>
    </tbody>
  </PackageContentList>
)

export default PackageContent
