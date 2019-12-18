import React from 'react'
import { render, waitForElement } from '@testing-library/react'

import Layout from '../Layout'

describe('Layout component test', () => {
  it('Should render header', async () => {
    const { getByText } = render(<Layout>test</Layout>)

    await waitForElement(() => getByText('UI challenge'))
  })
})
