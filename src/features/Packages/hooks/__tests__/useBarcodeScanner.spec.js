import { noop } from 'lodash'
import { renderHook } from '@testing-library/react-hooks'
import { fireEvent } from '@testing-library/react'

import useBarcodeScanner from '../useBarcodeScanner'

describe('useBarcodeScanner hook test', () => {
  const productsMock = [
    {
      id: 1,
      quantity: 5,
      sku: 'green-ball',
      location: 'a1'
    },
    {
      id: 2,
      quantity: 6,
      sku: 'red-ball',
      location: 'a2'
    },
    {
      id: 3,
      quantity: 3,
      sku: 'umbrella',
      location: 'a3'
    },
    {
      id: 99,
      quantity: 2,
      sku: 'green-ball',
      location: 'a4'
    }
  ]

  it('Calls onPack callback when valid SKU typed within one second and only one entry exist', done => {
    const spy = jest.fn()
    renderHook(() => useBarcodeScanner(productsMock, 'test', spy))
    expect(spy).toHaveBeenCalledTimes(0)

    fireEvent.keyDown(document.body, { key: 'r' })
    fireEvent.keyDown(document.body, { key: 'e' })
    fireEvent.keyDown(document.body, { key: 'd' })

    setTimeout(() => {
      fireEvent.keyDown(document.body, { key: '-' })
      fireEvent.keyDown(document.body, { key: 'b' })
      fireEvent.keyDown(document.body, { key: 'a' })
      fireEvent.keyDown(document.body, { key: 'l' })
      fireEvent.keyDown(document.body, { key: 'l' })
    }, 100)

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      done()
    }, 1300)
  })

  it('Does not call onPack callback when valid SKU typed within more than a second', done => {
    const spy = jest.fn()
    renderHook(() => useBarcodeScanner(productsMock, 'test', spy))
    expect(spy).toHaveBeenCalledTimes(0)

    fireEvent.keyDown(document.body, { key: 'r' })
    fireEvent.keyDown(document.body, { key: 'e' })
    fireEvent.keyDown(document.body, { key: 'd' })

    setTimeout(() => {
      fireEvent.keyDown(document.body, { key: '-' })
      fireEvent.keyDown(document.body, { key: 'b' })
      fireEvent.keyDown(document.body, { key: 'a' })
      fireEvent.keyDown(document.body, { key: 'l' })
      fireEvent.keyDown(document.body, { key: 'l' })
    }, 1100)

    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(0)
      done()
    }, 2300)
  })

  it('Populates available options and sets open modal flag when multiple items with same SKU exist', done => {
    const { result } = renderHook(() =>
      useBarcodeScanner(productsMock, 'test', noop)
    )
    expect(result.current.availableChoices).toHaveLength(0)
    expect(result.current.isModalOpen).toBe(false)

    fireEvent.keyDown(document.body, { key: 'g' })
    fireEvent.keyDown(document.body, { key: 'r' })
    fireEvent.keyDown(document.body, { key: 'e' })
    fireEvent.keyDown(document.body, { key: 'e' })
    fireEvent.keyDown(document.body, { key: 'n' })
    fireEvent.keyDown(document.body, { key: '-' })
    fireEvent.keyDown(document.body, { key: 'b' })
    fireEvent.keyDown(document.body, { key: 'a' })
    fireEvent.keyDown(document.body, { key: 'l' })
    fireEvent.keyDown(document.body, { key: 'l' })

    setTimeout(() => {
      expect(result.current.availableChoices).toHaveLength(2)
      expect(result.current.isModalOpen).toBe(true)
      done()
    }, 1300)
  })
})
