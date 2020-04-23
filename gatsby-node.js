exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/shop/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = "/shop/*"

    // Update the page.
    createPage(page)
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  /* const products = graphql(`
    query MyQuery {
      allAvettiProduct {
        nodes {
          url
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      Promise.reject(result.errors)
    }

    // Create product pages
    result.data.allAvettiProduct.nodes.forEach(node => {
      console.error(
        "URL::::",
        node.url.replace("https://bdadmin3qa.avetti.io/preview/", "")
      )
      actions.createPage({
        path: `/${node.url.replace(
          "https://bdadmin3qa.avetti.io/preview/",
          ""
        )}`,
        component: require.resolve("./src/templates/product.js"),
        context: {
          url: node.url,
        },
      })
    })
  })
 */
  const categories = graphql(`
    query MyQuery {
      allAvettiCategory {
        nodes {
          url
          numberOfPages
        }
      }
    }
  `).then(async result => {
    if (result.errors) {
      Promise.reject(result.errors)
    }
    // Create product pages
    result.data.allAvettiCategory.nodes.forEach(async node => {
      const pageCount = Number(node.numberOfPages)
      console.error("::CAT::", node.url)
      await Array.from({ length: pageCount }).map((_, index) =>
        actions.createPage({
          path:
            index === 0
              ? `/${node.url.replace("shop/", "")}`
              : `/${node.url.replace("shop/", "")}/${index + 1}`,
          component: require.resolve("./src/templates/category.js"),
          context: {
            pageCount,
            currentPage: index + 1,
            url: node.url,
          },
        })
      )
    })
  })

  return Promise.all([categories])
}
