import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const PackageTabContainer = styled.div`
  display: inline-block;
  padding: 10px;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
`

const PackageTab = ({ number, active }) => (
  <PackageTabContainer active={active}>
    <a>Package {number}</a>
  </PackageTabContainer>
)

PackageTab.propTypes = {
  number: PropTypes.number.isRequired,
  active: PropTypes.bool
}

export default PackageTab
