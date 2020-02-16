import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import MenuIcon from "@material-ui/icons/Menu"
import ListItemText from "@material-ui/core/ListItemText"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import MailIcon from "@material-ui/icons/Mail"
import { Link } from "gatsby"
import IconButton from "@material-ui/core/IconButton"

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
})

/**
 * hello ! hi back
 *
 */
export default function SwipeableTemporaryDrawer() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    left: false,
  })

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState({ ...state, [side]: open })
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Link
          key={"Materials"}
          to="/allMaterials/"
          activeStyle={{
            textDecoration: "none",
            cursor: "pointer",
            color: "inherit",
          }}
        >
          <ListItem button key={"Materials button"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Materials"} />
          </ListItem>
        </Link>
        <Link
          key={"Add Material"}
          to="/addMaterial/"
          activeStyle={{
            textDecoration: "none",
            cursor: "pointer",
            color: "inherit",
          }}
        >
          <ListItem button key={"Add Material"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Add Material"} />
          </ListItem>
        </Link>
        <Link
          key={"Help"}
          to="/help/"
          activeStyle={{
            textDecoration: "none",
            cursor: "pointer",
            color: "inherit",
          }}
        >
          <ListItem button key={"Help button"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Help"} />
          </ListItem>
        </Link>
        <Link
          key={"Contact"}
          to="/contact/"
          activeStyle={{
            textDecoration: "none",
            cursor: "pointer",
            color: "inherit",
          }}
        >
          <ListItem button key={"Contact button"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Contact"} />
          </ListItem>
        </Link>
        <Link
          key={"About"}
          to="/about/"
          activeStyle={{
            textDecoration: "none",
            cursor: "pointer",
            color: "inherit",
          }}
        >
          <ListItem button key={"About button"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        {["Login", "Register"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div>
      <IconButton
        onClick={toggleDrawer("left", true)}
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>

      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {sideList("left")}
      </SwipeableDrawer>
    </div>
  )
}
