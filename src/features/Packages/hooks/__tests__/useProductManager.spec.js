import { act, renderHook } from '@testing-library/react-hooks'

import useProductManager from '../useProductManager'

describe('useProductManager hook test', () => {
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
      quantity: 1,
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

  it('Correctly sorts products list', () => {
    const { result } = renderHook(() => useProductManager(productsMock))

    expect(result.current.sortedProducts).toHaveLength(4)
    expect(result.current.sortedProducts[0].sku).toBe('green-ball')
    expect(result.current.sortedProducts[0].location).toBe('a1')
    expect(result.current.sortedProducts[1].sku).toBe('green-ball')
    expect(result.current.sortedProducts[1].location).toBe('a4')
    expect(result.current.sortedProducts[2].sku).toBe('red-ball')
    expect(result.current.sortedProducts[3].sku).toBe('umbrella')
  })

  it('Decrements product quantity after product removal', () => {
    const { result } = renderHook(() => useProductManager(productsMock))
    expect(result.current.sortedProducts[2].quantity).toBe(6)

    act(() => result.current.removeProduct(2))
    expect(result.current.sortedProducts[2].quantity).toBe(5)
  })

  it('Removes product from the list when the quantity is zero', () => {
    const { result } = renderHook(() => useProductManager(productsMock))
    expect(result.current.sortedProducts).toHaveLength(4)
    expect(result.current.sortedProducts.find(p => p.id === 3)).toBeDefined()

    act(() => result.current.removeProduct(3))
    expect(result.current.sortedProducts).toHaveLength(3)
    expect(result.current.sortedProducts.find(p => p.id === 3)).toBeUndefined()
  })

  it('Increments product quantity after adding when product already existed', () => {
    const { result } = renderHook(() => useProductManager(productsMock))
    expect(result.current.sortedProducts[2].quantity).toBe(6)

    act(() =>
      result.current.addProduct({
        id: 2,
        sku: 'red-ball',
        location: 'a2'
      })
    )
    expect(result.current.sortedProducts[2].quantity).toBe(7)
  })

  it('Adds product to the list when it has not existed before', () => {
    const { result } = renderHook(() => useProductManager(productsMock))
    expect(result.current.sortedProducts).toHaveLength(4)
    expect(
      result.current.sortedProducts.find(p => p.id === 100)
    ).toBeUndefined()

    act(() =>
      result.current.addProduct({
        id: 100,
        sku: 'umbrella',
        location: 'a5'
      })
    )
    expect(result.current.sortedProducts).toHaveLength(5)
    expect(result.current.sortedProducts[4].id).toBe(100)
    expect(result.current.sortedProducts[4].sku).toBe('umbrella')
    expect(result.current.sortedProducts[4].location).toBe('a5')
    expect(result.current.sortedProducts[4].quantity).toBe(1)
  })
})
