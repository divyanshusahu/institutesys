import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { schoolSidebarSelect } from "../../../actions/schoolSidebarActions";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(8)
  }
}));

function SidebarItems(props) {
  const classes = useStyles();

  const [nestedopen0, setOpen0] = React.useState(false);

  function handleClick0() {
    setOpen0(!nestedopen0);
  }

  return (
    <div>
      <ListItem
        button
        onClick={() => props.schoolSidebarSelect("default_dashboard")}
      >
        <ListItemIcon>
          <Icon>dashboard</Icon>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button onClick={handleClick0}>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Profile" />
        {nestedopen0 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("create_academic_year")}
          >
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create Academic Year" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("add_weekly_holiday")}
          >
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Weekly Holiday" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List Acedemic Year" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick0}>
        <ListItemIcon>
          <Icon>payment</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Grades" />
        {nestedopen0 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create Grade" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List Grade" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick0}>
        <ListItemIcon>
          <Icon>payment</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Subject" />
        {nestedopen0 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create Subjects" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List Subjects" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick0}>
        <ListItemIcon>
          <Icon>payment</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Students" />
        {nestedopen0 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create Students" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List Students" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick0}>
        <ListItemIcon>
          <Icon>payment</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Divisions" />
        {nestedopen0 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Divisions" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Allot Students" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Division Time Table" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List Divisions" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick0}>
        <ListItemIcon>
          <Icon>payment</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Slots" />
        {nestedopen0 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create Slot" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Time Table" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Division Time Slots" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick0}>
        <ListItemIcon>
          <Icon>payment</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Teachers" />
        {nestedopen0 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Skills" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Time Slots" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List Teachers" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick0}>
        <ListItemIcon>
          <Icon>payment</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Awards" />
        {nestedopen0 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Awards" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Calculate Award" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="List Awards" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List Toppers" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick0}>
        <ListItemIcon>
          <Icon>payment</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Holidays" />
        {nestedopen0 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="List Holidays" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button>
        <ListItemIcon>
          <Icon>payment</Icon>
        </ListItemIcon>
        <ListItemText primary="School Calender" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <Icon>payment</Icon>
        </ListItemIcon>
        <ListItemText primary="Notice Board" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <Icon>mail</Icon>
        </ListItemIcon>
        <ListItemText primary="SMTP" />
      </ListItem>

      <ListItem button onClick={handleClick0}>
        <ListItemIcon>
          <Icon>payment</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Levels" />
        {nestedopen0 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Level 1" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Level 2" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Level 3" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick0}>
        <ListItemIcon>
          <Icon>payment</Icon>
        </ListItemIcon>
        <ListItemText primary="Appointments" />
        {nestedopen0 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create Appointment Slot" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick0}>
        <ListItemIcon>
          <Icon>payment</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Exams" />
        {nestedopen0 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create Exam" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="View Exam" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button>
        <ListItemIcon>
          <Icon>subscriptions</Icon>
        </ListItemIcon>
        <ListItemText primary="Leave Approvals" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <Icon>shoping_basket</Icon>
        </ListItemIcon>
        <ListItemText primary="Hand Book" />
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
}

SidebarItems.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { logoutUser, schoolSidebarSelect }
)(SidebarItems);
