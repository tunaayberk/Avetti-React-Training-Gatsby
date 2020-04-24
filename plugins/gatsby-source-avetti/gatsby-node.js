const fs = require("fs")
const fetch = require("node-fetch")
const queryString = require("query-string")
const data = require("./data.json")
const listOfProducts = require("../../prefetchdata/products/list.json")

exports.onPreInit = () => console.log("Loaded Avetti-Source-Plugin")

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
  const apiUrl = product => `${product}?tpt=json_en`
  const productUrl = id =>
    `https://demob2b2cpreview.avetti.io/preview/uservices/1.0.2/product/20180521148/iid/${id}/lang/en/`
  const supplierUrl = id =>
    `https://demob2b2cpreview.avetti.io/preview/uservices/1.0.2/suppliers/20180521148/iid/${id}/lang/en/`
  const priceInventoryUrl = id =>
    `https://demob2b2cpreview.avetti.io/preview/uservices/1.0.2/priceinventory/20180521148/iid/${id}/lang/en/`

  // Gatsby expects sourceNodes to return a promise
  const processData = data => {
    console.error("TYPEOF PRODUCT", typeof data)
    const nodeId = createNodeId(`${data[0].id}`)
    const nodeContent = JSON.stringify(data)
    const nodeData = Object.assign({}, data, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `AvettiProduct`,
        content: nodeContent,
        contentDigest: createContentDigest(data),
      },
    })
    return nodeData
  }

  function wait(ms, value) {
    return new Promise(resolve => setTimeout(resolve, ms, value))
  }

  return await Promise.all(
    data.map(async dat => {
      if (!Object.keys(listOfProducts).includes(dat.loc)) {
        await fetch(apiUrl(dat.loc))
          .then(res => res.json())
          .then(async json => {
            const productData = await fetch(productUrl(json[0].id))
              .then(res => res.json())
              .catch(err => console.error(err))
            const supplierData = await fetch(supplierUrl(json[0].id))
              .then(res => res.json())
              .catch(err => console.error(err))
            const priceInvData = await fetch(priceInventoryUrl(json[0].id))
              .then(res => res.json())
              .catch(err => console.error(err))

            const productFinalData = {
              ...json,
              url: dat.loc,
              productData: productData,
              supplierData: supplierData,
              priceInvData: priceInvData,
            }
            console.error("FINAL COUNTDOWN", productFinalData)

            fs.writeFile(
              `./prefetchdata/products/${json[0].id}.json`,
              JSON.stringify(productFinalData),
              { flag: "wx" },
              err => {
                if (err) throw err
                console.log("Product Data written to file")
              }
            )

            fs.appendFile(
              `./prefetchdata/products/list.json`,
              JSON.stringify({ [dat.loc]: json[0].id }),
              err => {
                if (err) throw err
                console.log("Product List updated")
              }
            )
            return wait(1000, processData(productFinalData))
          })
          .then(nodedata => {
            Promise.resolve(createNode(nodedata))
          })
          .catch(err => Promise.reject(console.error(err)))
      } else {
        const fileData = fs.readFileSync(
          `./prefetchdata/products/${listOfProducts[dat.loc]}.json`,
          "UTF8",
          (err, data) => {
            return data
          }
        )

        Promise.resolve(createNode(processData(JSON.parse(fileData))))
      }
    })
  )
}
