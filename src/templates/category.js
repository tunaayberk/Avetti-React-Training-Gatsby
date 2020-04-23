import React from "react"
import { graphql } from "gatsby"
import Layout from "../other/layout"
import CategoryPage from "../components/categorypage/CategoryPage"
import SEO from "../other/seo"

export const query = graphql`
  query MyQuery2($url: String) {
    allAvettiCategory(filter: { url: { eq: $url } }) {
      nodes {
        cid
        url
        name
        meta {
          metadescription
          metakeywords
        }
        image
        itemsCount
        numberOfPages
        description
        itemsFirstPage {
          id
          title
          code
          desc
          currency_sign
          image
          itemLargeImage
          price {
            list_price
            value {
              integer
              decimal
            }
          }
          url
        }
        otherPages {
          _2 {
            id
            title
            code
            desc
            currency_sign
            image
            itemLargeImage
            price {
              list_price
              value {
                integer
                decimal
              }
            }
            url
            properties {
              Sys_Num_Images
            }
          }
        }
      }
    }
  }
`
const category = ({ data, pageContext }) => {
  const name = data.allAvettiCategory.nodes[0].name
  const meta = data.allAvettiCategory.nodes[0].meta
  const image = data.allAvettiCategory.nodes[0].image

  const imageUrl = `https://demob2b2cpreview.avetti.io/preview/store${image}`

  console.error(
    "DATA NEW CATEGORY",
    data.allAvettiCategory.nodes[0].meta.metadescription,
    "**************",
    name,
    pageContext,
    data.allAvettiCategory.nodes[0],
    pageContext.currentPage === 1
  )
  console.error(
    "DATA NEW CATEGORY ITEMS",
    pageContext.currentPage === 1
      ? data.allAvettiCategory.nodes[0].itemsFirstPage
      : data.allAvettiCategory.nodes[0].otherPages[
          `_${pageContext.currentPage}`
        ]
  )
  return (
    <Layout>
      <SEO
        description={data.allAvettiCategory.nodes[0].meta.metadescription}
        lang={"en"}
        title={name}
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
          {
            name: `metakeywords`,
            content: meta.metakeywords,
          },
        ]}
      />
      <CategoryPage
        data={data.allAvettiCategory.nodes[0]}
        pageContext={pageContext}
        imageUrl={imageUrl}
      />
    </Layout>
  )
}

export default category
