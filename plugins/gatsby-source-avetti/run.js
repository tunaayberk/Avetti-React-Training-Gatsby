const fetch = require("node-fetch")
const fs = require("fs")
const data = require("./data.json")

const apiUrl = product => `${product}?tpt=json_en`

const anAsyncFetch = async item => {
  let response = await fetch(apiUrl(item))
    .then(res => res.json())
    .then(json => {
      console.log("****", json)
      return json
    })
    .catch(err => console.error(err))
  return response
}

data.map(dat => anAsyncFetch(dat.loc).then(res => console.error("HELLO", res)))
