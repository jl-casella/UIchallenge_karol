import { withMockedDelay } from 'services/api'

const mockedProductsResponse = [
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

const getUnpackedProducts = () => {
  return new Promise(resolve => {
    withMockedDelay(resolve, mockedProductsResponse)
  })
}

const postShipPackagesRequest = packages => {
  console.log({ packages })
}

export { getUnpackedProducts, postShipPackagesRequest }
