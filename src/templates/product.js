import React from "react"
import { graphql } from "gatsby"
import Layout from "../other/layout"
import SEO from "../other/seo"
import ProductPage from "../components/productpage/ProductPage"

export const query = graphql`
  query MyQuery($url: String) {
    allAvettiProduct(filter: { url: { eq: $url } }) {
      nodes {
        url
        _0 {
          breadcrumbs {
            name
            url
          }
        }
        productData {
          _xResult {
            code
            itemId
            title
            shortdesc
            longdesc
            properties {
              propname
              propvalue
              propnumber
            }
            hiddenProperties {
              propname
              propvalue
            }
          }
        }
        supplierData {
          _xResult {
            distributorOrder {
              name
              desc
              rating
            }
          }
        }
        priceInvData {
          _xResult {
            prices {
              price_1
              listprice
            }
          }
        }
      }
    }
  }
`
const product = ({ data }) => {
  const { productData } = data.allAvettiProduct.nodes[0]
  const code = productData._xResult[0].code
  const imageUrl = `https://bdadmin3qa.avetti.ca/preview/store/20180522154/assets/items/images/${code}.jpg`
  return (
    <Layout>
      <SEO
        description={productData._xResult[0].shortdesc}
        lang={"en"}
        title={productData._xResult[0].title}
        code={code}
        meta={[
          {
            name: `og:image`,
            content: imageUrl,
          },
          {
            name: `og:image:secure_url`,
            content: imageUrl,
          },
          {
            name: `twitter:image`,
            content: imageUrl,
          },
        ]}
      />
      <ProductPage data={data.allAvettiProduct.nodes[0]} />
    </Layout>
  )
}

export default product
