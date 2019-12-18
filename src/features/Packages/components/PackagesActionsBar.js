import Popup from 'reactjs-popup'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Button from 'atomics/Button'

const PackagesActionsBarContainer = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex: 0 0 100%;
`

const PackagesActionsBar = ({
  onAddPackage,
  shippingEnabled,
  onShipPackages
}) => (
  <PackagesActionsBarContainer>
    <Button onClick={onAddPackage}>Add Package</Button>
    <Popup
      trigger={
        <Button onClick={onShipPackages} disabled={!shippingEnabled}>
          Ship!
        </Button>
      }
      position="left center"
      on="hover"
      contentStyle={{
        width: 'auto',
        fontWeight: 'normal',
        textAlign: 'center'
      }}
      disabled={shippingEnabled}
    >
      <span>In order to ship packages, all items must be packed</span>
    </Popup>
  </PackagesActionsBarContainer>
)

PackagesActionsBar.propTypes = {
  onAddPackage: PropTypes.func.isRequired,
  shippingEnabled: PropTypes.bool.isRequired,
  onShipPackages: PropTypes.func.isRequired
}

export default PackagesActionsBar
