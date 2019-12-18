import { act, renderHook } from '@testing-library/react-hooks'

import usePackageManager from '../usePackageManager'

describe('usePackageManager hook test', () => {
  it('Correctly adds new package', () => {
    const { result } = renderHook(() => usePackageManager())
    expect(result.current.packages).toHaveLength(0)

    act(() => result.current.addPackage())
    expect(result.current.packages).toHaveLength(1)
  })

  it('Correctly sets active package ID after package addition', () => {
    const { result } = renderHook(() => usePackageManager())

    act(() => result.current.addPackage())
    expect(result.current.activePackageId).toBe(result.current.packages[0].id)
  })

  it('Correctly removes the package from the list', () => {
    const { result } = renderHook(() => usePackageManager())

    act(() => result.current.addPackage())
    act(() => result.current.addPackage())
    expect(result.current.packages).toHaveLength(2)

    const firstPackageId = result.current.packages[0].id
    const secondPackageId = result.current.packages[1].id

    act(() => result.current.removePackage(firstPackageId))
    expect(result.current.packages).toHaveLength(1)
    expect(
      result.current.packages.find(p => p.id === firstPackageId)
    ).toBeUndefined()
    expect(
      result.current.packages.find(p => p.id === secondPackageId)
    ).toBeDefined()
  })

  it('Correctly resets selected package ID after removal of selected package', () => {
    const { result } = renderHook(() => usePackageManager())
    act(() => result.current.addPackage())
    act(() => result.current.addPackage())

    const secondPackageId = result.current.packages[1].id
    expect(result.current.activePackageId).toBe(secondPackageId)

    act(() => result.current.removePackage(secondPackageId))
    expect(result.current.activePackageId).toBeUndefined()
  })

  it('Does not reset selected package ID after removal of non-selected package', () => {
    const { result } = renderHook(() => usePackageManager())
    act(() => result.current.addPackage())
    act(() => result.current.addPackage())

    const firstPackageId = result.current.packages[0].id
    const secondPackageId = result.current.packages[1].id
    expect(result.current.activePackageId).toBe(secondPackageId)

    act(() => result.current.removePackage(firstPackageId))
    expect(result.current.activePackageId).toBe(secondPackageId)
  })

  it('Correctly adds product to package for the first time', () => {
    const { result } = renderHook(() => usePackageManager())

    act(() => result.current.addPackage())
    const firstPackageId = result.current.packages[0].id

    expect(result.current.packages[0].items).toHaveLength(0)
    act(() =>
      result.current.addProductToPackage(
        {
          id: 2,
          sku: 'red-ball',
          location: 'a2'
        },
        firstPackageId
      )
    )

    expect(result.current.packages[0].items).toHaveLength(1)
    expect(result.current.packages[0].items[0].id).toBe(2)
    expect(result.current.packages[0].items[0].sku).toBe('red-ball')
    expect(result.current.packages[0].items[0].location).toBe('a2')
    expect(result.current.packages[0].items[0].quantity).toBe(1)
  })

  it('Correctly adds product to package for the subsequent time', () => {
    const { result } = renderHook(() => usePackageManager())

    act(() => result.current.addPackage())
    const firstPackageId = result.current.packages[0].id

    expect(result.current.packages[0].items).toHaveLength(0)
    act(() =>
      result.current.addProductToPackage(
        {
          id: 2,
          sku: 'red-ball',
          location: 'a2'
        },
        firstPackageId
      )
    )
    act(() =>
      result.current.addProductToPackage(
        {
          id: 2,
          sku: 'red-ball',
          location: 'a2'
        },
        firstPackageId
      )
    )

    expect(result.current.packages[0].items).toHaveLength(1)
    expect(result.current.packages[0].items[0].id).toBe(2)
    expect(result.current.packages[0].items[0].sku).toBe('red-ball')
    expect(result.current.packages[0].items[0].location).toBe('a2')
    expect(result.current.packages[0].items[0].quantity).toBe(2)
  })

  it('Correctly removes product from package when its quantity is equal to 1', () => {
    const { result } = renderHook(() => usePackageManager())

    act(() => result.current.addPackage())
    const firstPackageId = result.current.packages[0].id

    expect(result.current.packages[0].items).toHaveLength(0)
    act(() =>
      result.current.addProductToPackage(
        {
          id: 2,
          sku: 'red-ball',
          location: 'a2'
        },
        firstPackageId
      )
    )

    expect(result.current.packages[0].items).toHaveLength(1)
    act(() => result.current.removeProductFromPackage(2, firstPackageId))
    expect(result.current.packages[0].items).toHaveLength(0)
  })

  it('Correctly removes product from package when its quantity is above 1', () => {
    const { result } = renderHook(() => usePackageManager())

    act(() => result.current.addPackage())
    const firstPackageId = result.current.packages[0].id

    expect(result.current.packages[0].items).toHaveLength(0)
    act(() =>
      result.current.addProductToPackage(
        {
          id: 2,
          sku: 'red-ball',
          location: 'a2'
        },
        firstPackageId
      )
    )
    act(() =>
      result.current.addProductToPackage(
        {
          id: 2,
          sku: 'red-ball',
          location: 'a2'
        },
        firstPackageId
      )
    )

    expect(result.current.packages[0].items).toHaveLength(1)
    expect(result.current.packages[0].items[0].quantity).toBe(2)
    act(() => result.current.removeProductFromPackage(2, firstPackageId))
    expect(result.current.packages[0].items).toHaveLength(1)
    expect(result.current.packages[0].items[0].quantity).toBe(1)
  })
})
