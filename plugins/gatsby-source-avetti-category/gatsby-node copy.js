const fetch = require("node-fetch")
const queryString = require("query-string")

exports.onPreInit = () => console.log("Loaded Avetti-Source-Category-Plugin")

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  // plugin code goes here...
  // Convert the options object into a query string
  const apiOptions = queryString.stringify(configOptions)
  // Join apiOptions with the Pixabay API URL
  const menuUrl = `https://bdadmin3qa.avetti.io/preview/uservices/1.0.2/menu/20180730431/category/Shop/lang/en/?longdesc=1`
  const categoryUrl = id =>
    `https://bdadmin3qa.avetti.io/preview/uservices/1.0.2/category-page/20180730431/cid/${id}/lang/en/page/1/showperpage/12/`
  const pagingUrl = (id, page) =>
    `https://bdadmin3qa.avetti.io/preview/uservices/1.0.2/category-paging/20180730431/cid/${id}/lang/en/page/${page}/showperpage/12/`

  const navCats = await fetch(menuUrl)
    .then(res => res.json())
    .catch(err => console.error(err))

  // Gatsby expects sourceNodes to return a promise
  const processData = data => {
    const nodeId = createNodeId(`${data.cid}`)
    const nodeContent = JSON.stringify(data)
    const nodeData = Object.assign({}, data, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `AvettiCategory`,
        content: nodeContent,
        contentDigest: createContentDigest(data),
      },
    })
    return nodeData
  }

  return await Promise.all([
    navCats.childs.slice(6).map(async cat => {
      if (cat.name !== "Collections") {
        await fetch(categoryUrl(cat.cid))
          .then(res => res.json())
          .then(json => {
            return processData({
              cid: cat.cid,
              url: cat.URL,
              name: cat.name,
              meta: {
                metadescription: cat.metadescription,
                metakeywords: cat.metakeywords,
              },
              image: cat.image,
              thumbnail: cat.thumbnail,
              description: cat.description,
              longdesc: cat.longdesc,
              numberOfPages: json[0].numOfPages,
              itemsFirstPage: json[1].items,
              itemsCount: json[4].itemsCount,
              facets: {
                Price: json[2].facets[0].Price,
                Reviews: json[2].facets[1].Reviews,
                Other: json[2].facets[2].Other,
              },
            })
          })
          .then(nodedata => Promise.resolve(createNode(nodedata)))
          .catch(err => Promise.reject(console.error(err)))
      }
    }),
    Promise.resolve(
      createNode(
        navCats.then(json => {
          const nodeId = createNodeId(`${json.cid}`)
          const nodeContent = JSON.stringify(json)
          const nodeData = Object.assign({}, json, {
            id: nodeId,
            parent: null,
            children: [],
            internal: {
              type: `AvettiMenu`,
              content: nodeContent,
              contentDigest: createContentDigest(json),
            },
          })
          return nodeData
        })
      )
    ),
  ])
}
