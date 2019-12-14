import PropTypes from 'prop-types'

const Product = PropTypes.exact({
  id: PropTypes.number,
  quantity: PropTypes.number,
  sku: PropTypes.string,
  location: PropTypes.string
})

const Package = PropTypes.exact({
  items: PropTypes.arrayOf(Product)
})

export { Product, Package }
