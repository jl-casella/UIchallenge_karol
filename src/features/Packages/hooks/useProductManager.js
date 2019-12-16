import { orderBy } from 'lodash'
import React from 'react'

const useProductManager = unpackedProducts => {
  const [products, setProducts] = React.useState(unpackedProducts)

  const addProduct = React.useCallback(
    product => {
      const newProductsList = products.find(p => p.id === product.id)
        ? products.map(p =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          )
        : [...products, { ...product, quantity: 1 }]

      setProducts(newProductsList)
    },
    [products]
  )

  const removeProduct = React.useCallback(
    productId => {
      const productToRemove = products.find(p => p.id === productId)

      if (productToRemove) {
        const newProductsList =
          productToRemove.quantity === 1
            ? products.filter(p => p.id !== productId)
            : products.map(p =>
                p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
              )

        setProducts(newProductsList)
      }
    },
    [products]
  )

  const sortedProducts = React.useMemo(() => {
    return orderBy(products, ['sku', 'location'])
  })

  return {
    sortedProducts,
    addProduct,
    removeProduct
  }
}

export default useProductManager
