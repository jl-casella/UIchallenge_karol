import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const page = ctx.renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps, ...page, styleTags }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {this.props.styleTags}
          <meta
            name="description"
            content="ShipHero UI Challenge solution by Karol Kowalczuk"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
