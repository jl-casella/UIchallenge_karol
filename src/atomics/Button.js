import styled from 'styled-components'

const Button = styled.button`
  display: inline-flex;
  border-radius: 2px;
  color: ${props => (props.disabled ? 'grey' : 'black')};
  height: 34px;
  background-color: white;
  box-shadow: 2px 2px 5px 0 darkgrey;
  font-size: 14px;
  line-height: 14px;
  padding: 10px 24px;
  outline: none;
  border: 1px solid ${props => (props.disabled ? 'grey' : 'black')};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};

  :hover,
  :active {
    color: ${props => (props.disabled ? 'grey' : 'white')};
    background-color: ${props => (props.disabled ? 'white' : 'black')};
  }
`

export default Button
