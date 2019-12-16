import PropTypes from 'prop-types'

const Product = PropTypes.exact({
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  sku: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
})

const Package = PropTypes.exact({
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(Product).isRequired
})

export { Product, Package }
