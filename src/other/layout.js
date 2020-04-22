/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import { Provider } from "react-redux"
import configureStore from "../redux/index.js"
import { I18nContextProvider } from "../i18n/index"

import Navigation from "../components/navigation/Navigation"

export const store = configureStore()

const Layout = ({ children }) => {
  return (
    <Provider store={store}>
      <I18nContextProvider>
        <div className="App">
          <Navigation />
          {children}
          <footer style={{ position: "absolute", bottom: 0 }}>
            © {new Date().getFullYear()}, Avetti Training
          </footer>
        </div>
      </I18nContextProvider>
    </Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
