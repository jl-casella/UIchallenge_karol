import React from 'react'
import { render, waitForElement } from '@testing-library/react'

import Index from 'pages/index'

describe('Challenge tests', () => {
  it('Should render', async () => {
    const { getByText } = render(<Index />)

    await waitForElement(() => getByText('UI challenge'))
  })
})
