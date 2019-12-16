import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ModalTitle = styled.h2`
  margin: 0;
  background-color: black;
  color: white;
  padding: 10px 20px;
`

const ModalContent = styled.div`
  padding: 10px 20px;
`

const Modal = ({ title, children }) => (
  <ModalWrapper>
    <ModalTitle>{title}</ModalTitle>
    <ModalContent>{children}</ModalContent>
  </ModalWrapper>
)

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Modal
