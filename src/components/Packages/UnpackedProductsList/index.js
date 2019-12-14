import React from 'react'
import styled from 'styled-components'

const UnpackedProductsTableContainer = styled.header`
  width: 50%;
  padding: 20px;
  border-right: 1px solid grey;
`

const UnpackedProductsList = () => (
  <UnpackedProductsTableContainer>
    Unpacked products
  </UnpackedProductsTableContainer>
)

export default UnpackedProductsList
