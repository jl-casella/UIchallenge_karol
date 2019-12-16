import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const AppHeader = styled.header`
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: black;
  color: white;
`

const DashboardContainer = styled.section`
  height: calc(100vh - 50px);
  overflow: hidden;
`

const DashboardContent = styled.div`
  display: flex;
  height: 100%;
  overflow-y: auto;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`

const Layout = props => (
  <>
    <AppHeader>
      <p>UI challenge</p>
    </AppHeader>
    <DashboardContainer>
      <DashboardContent>{props.children}</DashboardContent>
    </DashboardContainer>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
