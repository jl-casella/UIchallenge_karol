import styled from 'styled-components'

const Table = styled.table`
  line-height: 1.5;
  width: 100%;
  border-collapse: collapse;
  box-shadow: 2px 2px 5px 0 darkgrey;
  text-align: left;

  > thead {
    text-transform: uppercase;
    background-color: black;
    color: white;

    th {
      font-weight: normal;
    }
  }

  td,
  th {
    padding: 2px 8px;
    border: 1px solid black;
  }

  > tbody {
    > tr:nth-of-type(even) {
      background-color: lightgray;
    }
  }
`

export default Table
