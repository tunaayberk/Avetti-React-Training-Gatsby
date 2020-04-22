import React from "react"
import { Link } from "gatsby"

import Layout from "../other/layout"
import Counter from "../apps/Counter/Counter"
import SEO from "../other/seo"

const CounterPage = () => (
  <Layout>
    <SEO title="Home" />
    <Counter />
  </Layout>
)

export default CounterPage
