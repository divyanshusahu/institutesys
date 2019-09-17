import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

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

import SidebarItems from "./SidebarItems";
import DefaultDashboard from "./DefaultDashboard";
import CreateAcademicYear from "./CreateAcademicYear";
import AddWeeklyHoliday from "./AddWeeklyHodiday";
import ListAcademicYears from "./ListAcademicYears";
import CreateGrade from "./CreateGrade";
import ListGrades from "./ListGrades";
import CreateSubject from "./CreateSubject";
import ListSubjects from "./ListSubjects";
import CreateStudent from "./CreateStudent";

const drawerWidth = 350;

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

function SchoolDashboard(props) {
  if (props.auth.user.role !== "school") {
    props.history.push(props.auth.user.role);
  }
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (window.innerWidth < 576) {
      setOpen(false);
    }
  }, []);

  const [show, selectShow] = React.useState(
    <DefaultDashboard school={props.auth.user} />
  );

  const [instituteData, getInstituteData] = React.useState({});
  React.useEffect(() => {
    axios
      .get("/api/school/current_school?branch_email=" + props.auth.user.email)
      .then(res => {
        getInstituteData({
          institute_name: res.data.branch.institute_name,
          standard: res.data.branch.standard,
          address: res.data.branch.address
        });
      });
  }, [props.auth.user]);

  React.useEffect(() => {
    if (props.schoolSidebar.type === "default_dashboard") {
      selectShow(<DefaultDashboard school={props.auth.user} />);
    } else if (props.schoolSidebar.type === "create_academic_year") {
      selectShow(<CreateAcademicYear school={props.auth.user} />);
    } else if (props.schoolSidebar.type === "add_weekly_holiday") {
      selectShow(<AddWeeklyHoliday school={props.auth.user} />);
    } else if (props.schoolSidebar.type === "list_academic_year") {
      selectShow(<ListAcademicYears school={props.auth.user} />);
    } else if (props.schoolSidebar.type === "create_grade") {
      selectShow(
        <CreateGrade
          school={props.auth.user}
          standard={instituteData.standard}
        />
      );
    } else if (props.schoolSidebar.type === "list_grades") {
      selectShow(<ListGrades school={props.auth.user} />);
    } else if (props.schoolSidebar.type === "create_subject") {
      selectShow(<CreateSubject school={props.auth.user} />);
    } else if (props.schoolSidebar.type === "list_subjects") {
      selectShow(<ListSubjects school={props.auth.user} />);
    } else if (props.schoolSidebar.type === "create_student") {
      selectShow(<CreateStudent />);
    } else if (props.schoolSidebar.type === "list_student") {
    }
  }, [props.schoolSidebar.type, props.auth.user, instituteData.standard]);

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
          {show}
        </Container>
      </main>
    </div>
  );
}

SchoolDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  schoolSidebar: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  schoolSidebar: state.schoolSidebar
});

export default connect(mapStateToProps)(SchoolDashboard);
