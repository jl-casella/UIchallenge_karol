import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import PackageTab from '../PackageTab'
import { Package } from 'types/Packages'

const PackagesListContainer = styled.ul`
  padding: 0;
  margin: 2px 0 10px;
  min-height: 60px;
  max-height: 30%;
  overflow-y: auto;
`

const PackagesList = ({
  packages,
  activePackageId,
  setActivePackageId,
  removePackage
}) => (
  <PackagesListContainer>
    {packages.map((p, i) => {
      return (
        <PackageTab
          key={p.id}
          number={i + 1}
          active={p.id === activePackageId}
          setActivePackage={() => setActivePackageId(p.id)}
          removePackage={() => removePackage(p.id)}
          removeEnabled={p.items.length === 0}
        />
      )
    })}
  </PackagesListContainer>
)

PackagesList.propTypes = {
  packages: PropTypes.arrayOf(Package).isRequired,
  activePackageId: PropTypes.string,
  setActivePackageId: PropTypes.func.isRequired,
  removePackage: PropTypes.func.isRequired
}

export default PackagesList
