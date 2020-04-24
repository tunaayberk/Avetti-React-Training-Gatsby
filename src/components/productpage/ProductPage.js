import React from "react"
import Container from "@material-ui/core/Container"

const ProductPage = ({ data }) => {
  console.error("PRODUCT PAGE", data)
  return (
    <Container maxWidth="sm">
      <h1>{data.productData._xResult[0].title}</h1>
      <img
        src={`https://s3.ca-central-1.amazonaws.com/demob2b2cs3.avetti.ca/store/20180522154/assets/items/images/${data.productData._xResult[0].code}.jpg`}
      />
      <h3>{data.priceInvData._xResult[0].prices[0].listprice}CAD</h3>
    </Container>
  )
}

export default ProductPage
