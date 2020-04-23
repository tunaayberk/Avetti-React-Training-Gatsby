const fs = require("fs")
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
  const menuUrl = `https://demob2b2cpreview.avetti.io/preview/uservices/1.0.2/menu/20180521148/category/Shop/lang/en/`

  const categoryUrl = id =>
    `https://demob2b2cpreview.avetti.io/preview/uservices/1.0.2/category-page/20180521148/cid/${id}/lang/en/page/1/showperpage/8/`
  const pagingUrl = (id, page) =>
    `https://demob2b2cpreview.avetti.io/preview/uservices/1.0.2/category-paging/20180521148/cid/${id}/lang/en/page/${page}/showperpage/8/`

  const navCats = await fetch(menuUrl)
    .then(res => res.json())
    .catch(err => console.error(err))

  fs.writeFile("./prefetchdata/menu.json", JSON.stringify(navCats), err => {
    if (err) throw err
    console.log("Menu Data written to file")
  })

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
  function wait(ms, value) {
    return new Promise(resolve => setTimeout(resolve, ms, value))
  }

  return await Promise.all(
    navCats.childs.map(async cat => {
      if (!fs.existsSync(`./prefetchdata/categories/${cat.cid}.json`)) {
        if (cat.name !== "Collections" && cat.name !== "Designers") {
          await fetch(categoryUrl(cat.cid))
            .then(res => res.json())
            .then(async json => {
              const result = await Promise.all(
                Array.from({ length: Number(json[0].numOfPages) }).map(
                  async (number, index) => {
                    if (index !== 0) {
                      console.error(
                        "11111111PAGE NUMBERS111111",
                        pagingUrl(cat.cid, index)
                      )
                      return await (
                        await fetch(pagingUrl(cat.cid, index + 1))
                      ).json()
                    } else {
                      return []
                    }
                  }
                )
              ).then(postData => {
                return { postData, json }
              })
              console.error("NOOOOOOOOOOOOOOOOOOOO", result)
              return result
            })
            .then(async ({ json, postData }) => {
              const tempObjOther = {}
              postData
                .filter(res => (res.length > 0 ? true : false))
                .map((array, index) => {
                  tempObjOther[index + 2] = array[1].items
                })
              const catData = {
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
                numberOfPages: json[0].numOfPages,
                itemsFirstPage: json[1].items,
                otherPages: tempObjOther,
                itemsCount: json[4].itemsCount,
                facets: json[2].facets,
              }
              fs.writeFile(
                `./prefetchdata/categories/${cat.cid}.json`,
                JSON.stringify(catData),
                { flag: "wx" },
                err => {
                  if (err) throw err
                  console.log("Menu Data written to file")
                }
              )

              return wait(1000, processData(catData))
            })
            .then(nodedata => Promise.resolve(createNode(nodedata)))
            .catch(err => Promise.reject(console.error(err)))
        } else if (cat.name === "Designers") {
          cat.childs
            .filter(child => {
              if (!child.URL.includes("designers")) {
                return true
              } else {
                return false
              }
            })
            .map(async designer => {
              await fetch(categoryUrl(designer.cid))
                .then(res => res.json())
                .then(async json => {
                  const result = await Promise.all(
                    Array.from({ length: Number(json[0].numOfPages) }).map(
                      async (number, index) => {
                        if (index !== 0) {
                          console.error(
                            "11111111PAGE NUMBERS111111",
                            pagingUrl(designer.cid, index)
                          )
                          return await (
                            await fetch(pagingUrl(designer.cid, index + 1))
                          ).json()
                        } else {
                          return []
                        }
                      }
                    )
                  ).then(postData => {
                    return { postData, json }
                  })
                  console.error("NOOOOOOOOOOOOOOOOOOOO", result)
                  return result
                })
                .then(async ({ json, postData }) => {
                  const tempObjOther = {}
                  postData
                    .filter(res => (res.length > 0 ? true : false))
                    .map((array, index) => {
                      tempObjOther[index + 2] = array[1].items
                    })
                  const catData = {
                    cid: designer.cid,
                    url: "designers/" + designer.URL,
                    name: designer.name,
                    meta: {
                      metadescription: designer.metadescription,
                      metakeywords: designer.metakeywords,
                    },
                    image: designer.image,
                    thumbnail: designer.thumbnail,
                    description: designer.description,
                    longdesc: designer.longdesc,
                    numberOfPages: json[0].numOfPages,
                    itemsFirstPage: json[1].items,
                    otherPages: tempObjOther,
                    itemsCount: json[4].itemsCount,
                    facets: json[2].facets,
                  }
                  fs.writeFile(
                    `./prefetchdata/categories/${designer.cid}.json`,
                    JSON.stringify(catData),
                    { flag: "wx" },
                    err => {
                      if (err) throw err
                      console.log("Menu Data written to file")
                    }
                  )

                  return wait(1000, processData(catData))
                })
                .then(nodedata => Promise.resolve(createNode(nodedata)))
                .catch(err => Promise.reject(console.error(err)))
            })
        }
      } else {
        const fileData = fs.readFileSync(
          `./prefetchdata/categories/${cat.cid}.json`,
          "UTF8",
          (err, data) => {
            return JSON.parse(data)
          }
        )

        const proccessedData = processData(JSON.parse(fileData))

        Promise.resolve(createNode(proccessedData))
      }
    })
  )
}
