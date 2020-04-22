import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { useDispatch } from "react-redux"

import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { menuPopulate } from "../../redux/actions/menuActions"
import LanguageChanger from "../../i18n/components/LanguageChanger"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"

import useWindowSize from "../../shared/useWindowSize"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
  },
  title: {
    flexGrow: 1,
  },
}))

const Navigation = () => {
  const { mobileState } = useWindowSize()
  const [mobileMenu, setMobileMenu] = useState(false)

  const toggleDrawer = open => {
    console.error("MOBILE MENU", open)
    setMobileMenu(open)
  }

  useEffect(() => {
    console.error("WINDOW SIZE", mobileState)
  }, [mobileState])

  const dispatch = useDispatch()

  const classes = useStyles()
  const [menuState, setMenuState] = useState([
    { url: "/page/1", name: "Page 1" },
    { url: "/page/2", name: "Page 2" },
    { url: "/page/3", name: "Page 3" },
  ])

  useEffect(() => {
    fetch(
      "https://demob2b2cpreview.avetti.io/preview/uservices/1.0.2/menu/20180521148/category/Shop/lang/en/"
    )
      .then(res => res.json())
      .then(json => {
        let tempArr = json.childs.map(child => {
          let name = child.name.replace("&amp;", "&")
          let url = child.URL.replace("shop", "")
          let image = child.image
          let cid = child.cid
          return { url, name, image, cid }
        })
        return tempArr
      })
      .then(result => {
        dispatch(menuPopulate(result))
        setMenuState(result)
      })
  }, [])

  const menus = () => {
    return (
      <>
        <LanguageChanger />
        <Button color="inherit">
          <Link
            style={!mobileState ? { color: "white" } : { color: "black" }}
            to={"/counter"}
          >
            Counter
          </Link>
        </Button>
        {menuState.map((menu, index) => (
          <Button key={index} color="inherit">
            <Link
              style={!mobileState ? { color: "white" } : { color: "black" }}
              to={`/shop${menu.url}`}
            >
              {menu.name}
            </Link>
          </Button>
        ))}{" "}
      </>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {mobileState ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                anchor="left"
                open={mobileMenu}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
              >
                <button onClick={() => toggleDrawer(false)}>X</button>
                {menus()}
              </SwipeableDrawer>
            </>
          ) : null}

          <Typography variant="h6" className={classes.title}>
            <Link style={{ color: "white" }} to="/">
              Avetti React Training - RRD{" "}
            </Link>
          </Typography>
          {!mobileState ? menus() : null}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navigation
