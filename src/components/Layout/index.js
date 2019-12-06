import React from 'react'

const Layout = () => (
  <div style={{ display: 'flex', height: '100%' }}>
    <div style={{ width: '50%', padding: 20, borderRight: '1px solid grey' }}>
      Unpacked products
    </div>

    <div style={{ width: '50%', padding: 20 }}>Packed products</div>
  </div>
)

export { Layout }
