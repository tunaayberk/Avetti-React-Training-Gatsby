import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Pagination from "@material-ui/lab/Pagination"
import { navigate } from "@reach/router"

import ItemCard from "./components/ItemCard"
import Grid from "@material-ui/core/Grid"

import "./styles/CategoryPage.css"

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      display: "flex",
      justifyContent: "center",
      margin: "50px",
    },
  },
}))

const CategoryPage = ({ data, pageContext, imageUrl }) => {
  const classes = useStyles()

  console.error("CATEGORY PAGE INSIDE DATA", data)
  console.error("CATEGORY PAGE INSIDE PAGECONTEXT", pageContext)

  return (
    <div>
      <h1
        className="category-header"
        style={{
          background: `url(${imageUrl}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      >
        {data.name}
      </h1>
      <div className={classes.root}>
        <Pagination
          count={pageContext.pageCount}
          color="primary"
          page={pageContext.currentPage}
          onChange={(e, v) =>
            v !== 1
              ? navigate(`/${data.url.replace("shop/", "")}/${v}`)
              : navigate(`/${data.url.replace("shop/", "")}`)
          }
        />
      </div>
      <Grid container spacing={3}>
        {data.itemsFirstPage.length > 0 ? (
          pageContext.currentPage === 1 ? (
            data.itemsFirstPage.map((item, index) => {
              return (
                <Grid item xs={3}>
                  <ItemCard key={index} {...item} />
                </Grid>
              )
            })
          ) : (
            data.otherPages[`_${pageContext.currentPage}`].map(
              (item, index) => {
                return (
                  <Grid item xs={3}>
                    <ItemCard key={index} {...item} />
                  </Grid>
                )
              }
            )
          )
        ) : (
          <div
            style={{
              width: "100%",
              dispay: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <h1>We dont have any product for {data.name} categorty</h1>
          </div>
        )}
      </Grid>
    </div>
  )
}

export default CategoryPage
