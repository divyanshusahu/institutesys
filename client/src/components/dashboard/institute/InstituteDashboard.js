import React from "react";
import clsx from "clsx";
import MaterialTable from "material-table";
import isEmpty from "is-empty";
import { connect } from "react-redux";
import { listData } from "../../../actions/listActions";
import PropTypes from "prop-types";
import axios from "axios";
import Swal from "sweetalert2";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";

import SidebarItems from "./SidebarItems";

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    minHeight: "calc(100vh - 52px)"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

function InstituteDashboard(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  /*React.useEffect(() => {
    if (window.innerWidth < 576) {
      setOpen(false);
    }
  }*/

  const buySubscription = () => {
    axios.post("/api/payment/buy").then((res) => {
      window.open(res.data.redirect_url, "_parent");
    });
  }

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Hidden smUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton)}
            >
              <Icon>menu</Icon>
            </IconButton>
          </Hidden>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Institute System
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="secondary">
              <Icon>notifications</Icon>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={window.innerWidth > 576 ? "permanent" : "temporary"}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
        onClose={handleDrawerClose}
      >
        <div className={classes.toolbarIcon} />
        <Divider />
        <List>
          <SidebarItems />
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <Button onClick={buySubscription}>Buy Bronze</Button>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Button onClick={buySubscription}>Buy Silver</Button>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Button onClick={buySubscription}>Buy Platinum</Button>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default InstituteDashboard;
