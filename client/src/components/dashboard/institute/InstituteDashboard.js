import React from "react";
import clsx from "clsx";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";

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
import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import DefaultDashboard from "./DefaultDashboard";
import CreateBranch from "./CreateBranch";
import ListBranches from "./ListBranches";
import MyPlan from "./MyPlan";
import UpdateDetails from "./UpdateDetails";
import Plans from "../../layouts/Plans";

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
  },
  nested: {
    paddingLeft: theme.spacing(8)
  }
}));

function InstituteDashboard(props) {
  if (props.auth.user.role !== "institute") {
    props.history.push(props.auth.user.role);
  }
  const classes = useStyles();

  const [nestedopen0, setOpen0] = React.useState(false);
  function handleClick0() {
    setOpen0(!nestedopen0);
  }

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [show, setShow] = React.useState(
    <DefaultDashboard institute={props.auth.user} />
  );

  const handleShow = type => {
    if (type === "dashboard") {
      setShow(<DefaultDashboard institute={props.auth.user} />);
    } else if (type === "create_branch") {
      setShow(<CreateBranch />);
    } else if (type === "list_branches") {
      setShow(<ListBranches institute={props.auth.user} />);
    } else if (type === "my_plan") {
      setShow(<MyPlan />);
    } else if (type === "update_details") {
      setShow(<UpdateDetails institute={props.auth.user} />);
    } else if (type === "buy_plans") {
      setShow(<Plans />);
    }
  };

  React.useEffect(() => {
    if (window.innerWidth < 576) {
      setOpen(false);
    }
  }, []);

  /*const buySubscription = () => {
    axios.post("/api/payment/buy").then((res) => {
      window.open(res.data.redirect_url, "_parent");
    });
  }*/

  const sideBar = (
    <div>
      <ListItem button onClick={() => handleShow("dashboard")}>
        <ListItemIcon>
          <Icon>dashboard</Icon>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button onClick={handleClick0}>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Branches" />
        {nestedopen0 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleShow("create_branch")}
          >
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => handleShow("list_branches")}
          >
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button>
        <ListItemIcon>
          <Icon>payment</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Paypal" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <Icon>mail</Icon>
        </ListItemIcon>
        <ListItemText primary="SMTP" />
      </ListItem>

      <ListItem button onClick={() => handleShow("my_plan")}>
        <ListItemIcon>
          <Icon>subscriptions</Icon>
        </ListItemIcon>
        <ListItemText primary="My Plan" />
      </ListItem>

      <ListItem button onClick={() => handleShow("update_details")}>
        <ListItemIcon>
          <Icon>update</Icon>
        </ListItemIcon>
        <ListItemText primary="Update Details" />
      </ListItem>

      <Divider />

      <ListItem button onClick={() => handleShow("buy_plans")}>
        <ListItemIcon>
          <Icon>shoping_basket</Icon>
        </ListItemIcon>
        <ListItemText primary="Buy Plan" />
      </ListItem>

      <Divider />

      <ListItem button onClick={props.logoutUser}>
        <ListItemIcon>
          <Icon>power_settings_new</Icon>
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>

      <Divider />
    </div>
  );

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
        <List>{sideBar}</List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <div id="institute_dashboard_container">{show}</div>
        </Container>
      </main>
    </div>
  );
}

InstituteDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(InstituteDashboard);
