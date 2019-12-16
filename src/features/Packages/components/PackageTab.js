import Popup from 'reactjs-popup'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const PackageTabContainer = styled.li`
  display: inline-flex;
  align-items: center;
  padding: 6px 8px;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  background-color: ${props => (props.active ? 'lightgray' : 'white')};
  border-radius: 4px;
  margin: 4px 6px;
  font-size: 12px;
  border: 1px solid black;
  cursor: pointer;
`

const RemoveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  border-radius: 10px;
  border: 1px solid ${props => (props.disabled ? 'gray' : 'black')};
  color: ${props => (props.disabled ? 'gray' : 'black')};
  background-color: white;
  font-size: 8px;
  margin-left: 6px;
  font-weight: normal;

  :hover {
    background-color: ${props => (props.disabled ? 'white' : 'silver')};
  }
`

const PackageTab = ({
  number,
  active,
  setActivePackage,
  removeEnabled,
  removePackage
}) => {
  const onRemoveButtonClick = e => {
    if (removeEnabled) {
      removePackage()
    }

    e.stopPropagation()
  }

  return (
    <PackageTabContainer
      active={active}
      onClick={setActivePackage}
      removeEnabled={removeEnabled}
    >
      <a>Package {number}</a>
      <Popup
        trigger={
          <RemoveButton
            disabled={!removeEnabled}
            role="button"
            onClick={onRemoveButtonClick}
          >
            X
          </RemoveButton>
        }
        position="top center"
        on="hover"
        contentStyle={{
          width: 'auto',
          fontWeight: 'normal',
          textAlign: 'center'
        }}
      >
        <span>
          {removeEnabled
            ? 'Click to remove package'
            : 'Package must be emptied out before removing'}
        </span>
      </Popup>
    </PackageTabContainer>
  )
}

PackageTab.propTypes = {
  number: PropTypes.number.isRequired,
  active: PropTypes.bool,
  setActivePackage: PropTypes.func.isRequired,
  removePackage: PropTypes.func.isRequired,
  removeEnabled: PropTypes.bool.isRequired
}

export default PackageTab
