import { noop } from 'lodash'
import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'

import PackageTab from '../PackageTab'

describe('PackageTab component test', () => {
  it('Should render correctly when active', () => {
    const { container } = render(
      <PackageTab
        number={1}
        active={true}
        setActivePackage={noop}
        removePackage={noop}
        removeEnabled={true}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('Should render correctly when inactive', () => {
    const { container } = render(
      <PackageTab
        number={1}
        active={false}
        setActivePackage={noop}
        removePackage={noop}
        removeEnabled={true}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('Should render information tooltip when hovers over "X" button if removing disabled', async () => {
    const { getByRole, getByText } = render(
      <PackageTab
        number={1}
        active={false}
        setActivePackage={noop}
        removePackage={noop}
        removeEnabled={false}
      />
    )

    const removeButton = getByRole('button')
    fireEvent.mouseOver(removeButton)

    await waitForElement(() =>
      getByText('Package must be emptied out before removing')
    )
  })

  it('Should render information tooltip when hovers over "X" button if removing enabled', async () => {
    const { getByRole, getByText } = render(
      <PackageTab
        number={1}
        active={false}
        setActivePackage={noop}
        removePackage={noop}
        removeEnabled={true}
      />
    )

    const removeButton = getByRole('button')
    fireEvent.mouseOver(removeButton)

    await waitForElement(() => getByText('Click to remove package'))
  })

  it('Calls onRemove callback when clicking on "X" button if removing enabled', () => {
    const spy = jest.fn()
    const { getByRole } = render(
      <PackageTab
        number={1}
        active={false}
        setActivePackage={noop}
        removePackage={spy}
        removeEnabled={true}
      />
    )

    const removeButton = getByRole('button')
    expect(spy).toHaveBeenCalledTimes(0)

    fireEvent.click(removeButton)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('Does not call onRemove callback when clicking on "X" button if removing disabled', () => {
    const spy = jest.fn()
    const { getByRole } = render(
      <PackageTab
        number={1}
        active={false}
        setActivePackage={noop}
        removePackage={spy}
        removeEnabled={false}
      />
    )

    const removeButton = getByRole('button')
    expect(spy).toHaveBeenCalledTimes(0)

    fireEvent.click(removeButton)
    expect(spy).toHaveBeenCalledTimes(0)
  })

  it('Calls onSetActive callback after clicking on package number', () => {
    const spy = jest.fn()
    const { getByText } = render(
      <PackageTab
        number={1}
        active={false}
        setActivePackage={spy}
        removePackage={noop}
        removeEnabled={false}
      />
    )

    const tabNameContainer = getByText('Package 1')
    expect(spy).toHaveBeenCalledTimes(0)

    fireEvent.click(tabNameContainer)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
