import React from "react"
import { Router } from "@reach/router"

import Layout from "../other/layout"
import SEO from "../other/seo"

import NewCategoryPage from "../components/newCategoryPage/NewCategoryPage"

const shop = () => {
  return (
    <Layout>
      <SEO title="Shop" />
      <Router>
        <NewCategoryPage path={"/shop/:shopId"} />
      </Router>
    </Layout>
  )
}

export default shop
