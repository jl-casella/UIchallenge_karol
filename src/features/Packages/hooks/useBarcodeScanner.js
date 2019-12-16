import { debounce } from 'lodash'
import React from 'react'

const useBarcodeScanner = (availableItems, activePackageId, onPack) => {
  const scannedInput = React.useRef('')
  const [availableChoices, setAvailableChoices] = React.useState([])
  const [isModalOpen, setModalOpen] = React.useState(false)

  const onModalClose = React.useCallback(() => {
    setModalOpen(false)
    setAvailableChoices([])
  }, [])

  React.useEffect(() => {
    const checkInput = debounce(
      input => {
        const filteredProducts = availableItems.filter(p => p.sku === input)

        if (filteredProducts.length === 1) {
          onPack(filteredProducts[0])
        } else if (filteredProducts.length > 1) {
          setAvailableChoices(filteredProducts)
          setModalOpen(true)
        }

        scannedInput.current = ''
      },
      1000,
      { trailing: true }
    )

    const onKeyDownHandler = e => {
      if (activePackageId && !isModalOpen) {
        if ((e.key >= 'a' && e.key <= 'z') || e.key === '-') {
          scannedInput.current = `${scannedInput.current}${e.key}`
          checkInput(scannedInput.current)
        }
      }
    }

    document.addEventListener('keydown', onKeyDownHandler)

    return () => {
      checkInput.cancel()
      document.removeEventListener('keydown', onKeyDownHandler)
      scannedInput.current = ''
    }
  }, [availableItems, activePackageId, onPack, isModalOpen])

  return {
    availableChoices,
    onModalClose,
    isModalOpen
  }
}

export default useBarcodeScanner
