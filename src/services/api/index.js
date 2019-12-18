const withMockedDelay = (resolve, data) => {
  setTimeout(() => {
    resolve(data)
  }, 500)
}

export { withMockedDelay }
