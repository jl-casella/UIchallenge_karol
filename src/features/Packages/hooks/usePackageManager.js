import { chain } from 'lodash'
import React from 'react'
import uuid from 'uuid'

import { postShipPackagesRequest } from '../services/api'

const usePackageManager = () => {
  const [packages, setPackages] = React.useState([])
  const [activePackageId, setActivePackageId] = React.useState(undefined)

  const addPackage = React.useCallback(() => {
    const newPackageId = uuid.v4()

    setPackages([...packages, { id: newPackageId, items: [] }])
    setActivePackageId(newPackageId)
  }, [packages])

  const updatePackage = React.useCallback(
    (packageId, newContent) => {
      setPackages(
        packages.map(p =>
          p.id === packageId ? { ...p, items: newContent } : p
        )
      )
    },
    [packages]
  )

  const addProductToPackage = React.useCallback(
    (product, packageId) => {
      const packageToUpdate = packages.find(p => p.id === packageId)

      if (packageToUpdate) {
        const newPackageContent = packageToUpdate.items.find(
          i => i.id === product.id
        )
          ? packageToUpdate.items.map(i =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          : [...packageToUpdate.items, { ...product, quantity: 1 }]

        updatePackage(packageId, newPackageContent)
      }
    },
    [packages]
  )

  const removePackage = React.useCallback(
    packageId => {
      if (activePackageId === packageId) {
        setActivePackageId(undefined)
      }

      setPackages(packages.filter(p => p.id !== packageId))
    },
    [packages, activePackageId]
  )

  const removeProductFromPackage = React.useCallback(
    (productId, packageId) => {
      const packageToUpdate = packages.find(p => p.id === packageId)
      const productToRemove =
        packageToUpdate && packageToUpdate.items.find(i => i.id === productId)

      if (productToRemove) {
        const newPackageContent =
          productToRemove.quantity === 1
            ? packageToUpdate.items.filter(i => i.id !== productId)
            : packageToUpdate.items.map(i =>
                i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
              )

        updatePackage(packageId, newPackageContent)
      }
    },
    [packages]
  )

  const shipPackages = React.useCallback(() => {
    const validPackages = packages.filter(p => p.items.length > 0)

    if (validPackages.length) {
      const packages = validPackages.map(p => ({
        id: p.id,
        itemsPerLocation: chain(p.items)
          .groupBy('location')
          .map((v, k) => ({
            location: k,
            products: v.map(p => ({ id: p.id, quantity: p.quantity }))
          }))
          .value()
      }))

      postShipPackagesRequest(packages)
    }
  }, [packages])

  return {
    packages,
    activePackageId,
    setActivePackageId,
    addPackage,
    addProductToPackage,
    removePackage,
    removeProductFromPackage,
    shipPackages
  }
}

export default usePackageManager
