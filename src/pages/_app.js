import React from 'react'
import App from 'next/app'
import NextHead from 'next/head'
import { createGlobalStyle } from 'styled-components'
import 'normalize.css/normalize.css'

const IS_DEV = process.env.NODE_ENV !== 'production'

const UIStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

  html {
    font-size: 16px;
    font-weight: 300;
    color: #000000;
    font-family: 'Roboto', Open Sans, Segoe UI, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`

class NextApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <NextHead>
          <title>{`UI challenge ${IS_DEV ? ' (dev)' : ' (prod)'}`}</title>
        </NextHead>

        <>
          <Component {...pageProps} />
          <UIStyles />
        </>
      </>
    )
  }
}

export default NextApp
