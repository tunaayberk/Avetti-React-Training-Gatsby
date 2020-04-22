import React from "react"
import { Link } from "gatsby"

import Layout from "../other/layout"
import Home from "../components/pages/Home"
import SEO from "../other/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Home />
  </Layout>
)

export default IndexPage
