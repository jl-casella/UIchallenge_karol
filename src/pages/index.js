import PropTypes from 'prop-types'
import React from 'react'

import { getUnpackedProducts } from 'features/Packages/services/api'
import PackagesMainView from 'features/Packages/components/PackagesMainView'

const Index = ({ unpackedProducts }) => {
  return <PackagesMainView unpackedProducts={unpackedProducts} />
}

Index.propTypes = {
  unpackedProducts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}

Index.getInitialProps = async () => {
  const unpackedProducts = await getUnpackedProducts()
  return { unpackedProducts }
}

export default Index
