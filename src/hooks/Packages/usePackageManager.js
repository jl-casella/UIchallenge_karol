import React from 'react'

const usePackageManager = () => {
  const [packages, setPackages] = React.useState([])
  const [activePackageId, setActivePackageId] = React.useState(undefined)

  const addPackage = React.useCallback(() => {
    setActivePackageId(packages.length)
    setPackages([...packages, { items: [] }])
  }, [packages])

  const updatePackage = React.useCallback((packageId, newContent) => {
    setPackages(
      packages.map((p, i) =>
        i === packageId ? { ...p, items: newContent } : p
      )
    )
  })

  const addProductToPackage = React.useCallback(
    (product, packageId) => {
      const packageToUpdate = packages[packageId]

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

  const removeProductFromPackage = React.useCallback(
    (productId, packageId) => {
      const packageToUpdate = packages[packageId]
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

  return {
    packages,
    activePackageId,
    setActivePackageId,
    addPackage,
    addProductToPackage,
    removeProductFromPackage
  }
}

export default usePackageManager
