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

  const [nestedopen1, setOpen1] = React.useState(false);
  function handleClick1() {
    setOpen1(!nestedopen1);
  }

  const [nestedopen2, setOpen2] = React.useState(false);
  function handleClick2() {
    setOpen2(!nestedopen2);
  }

  const [nestedopen3, setOpen3] = React.useState(false);
  function handleClick3() {
    setOpen3(!nestedopen3);
  }

  const [nestedopen4, setOpen4] = React.useState(false);
  function handleClick4() {
    setOpen4(!nestedopen4);
  }

  const [nestedopen5, setOpen5] = React.useState(false);
  function handleClick5() {
    setOpen5(!nestedopen5);
  }

  const [nestedopen6, setOpen6] = React.useState(false);
  function handleClick6() {
    setOpen6(!nestedopen6);
  }

  const [nestedopen7, setOpen7] = React.useState(false);
  function handleClick7() {
    setOpen7(!nestedopen7);
  }

  const [nestedopen8, setOpen8] = React.useState(false);
  function handleClick8() {
    setOpen8(!nestedopen8);
  }

  const [nestedopen9, setOpen9] = React.useState(false);
  function handleClick9() {
    setOpen9(!nestedopen9);
  }

  const [nestedopen10, setOpen10] = React.useState(false);
  function handleClick10() {
    setOpen10(!nestedopen10);
  }

  const [nestedopen11, setOpen11] = React.useState(false);
  function handleClick11() {
    setOpen11(!nestedopen11);
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
              <Icon>add_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Weekly Holiday" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("list_academic_year")}
          >
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List Acedemic Year" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick1}>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Grades" />
        {nestedopen1 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("create_grade")}
          >
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create Grade" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("list_grades")}
          >
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List Grade" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick2}>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Subject" />
        {nestedopen2 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("create_subject")}
          >
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create Subjects" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("list_subjects")}
          >
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List Subjects" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick3}>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Students" />
        {nestedopen3 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("create_student")}
          >
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create Students" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("list_students")}
          >
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List Students" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick4}>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Divisions" />
        {nestedopen4 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("add_division")}
          >
            <ListItemIcon>
              <Icon>add_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Divisions" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>add_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="Allot Students" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>timeline</Icon>
            </ListItemIcon>
            <ListItemText primary="Division Time Table" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("list_divisions")}
          >
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List Divisions" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick5}>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Slots" />
        {nestedopen5 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen5} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("create_slot")}
          >
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create Slot" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>add_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Time Table" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>add_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Division Time Slots" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick6}>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Teachers" />
        {nestedopen6 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen6} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("create_teacher")}
          >
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>add_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Skills" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>add_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Time Slots" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("list_teachers")}
          >
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List Teachers" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick7}>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Awards" />
        {nestedopen7 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen7} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>add_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Awards" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary="Calculate Award" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>list</Icon>
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

      <ListItem button onClick={handleClick8}>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Holidays" />
        {nestedopen8 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen8} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("create_holiday")}
          >
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("list_holidays")}
          >
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List Holidays" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button>
        <ListItemIcon>
          <Icon>date_range</Icon>
        </ListItemIcon>
        <ListItemText primary="School Calender" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <Icon>notifications</Icon>
        </ListItemIcon>
        <ListItemText primary="Notice Board" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <Icon>mail</Icon>
        </ListItemIcon>
        <ListItemText primary="SMTP" />
      </ListItem>

      <ListItem button onClick={handleClick9}>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Levels" />
        {nestedopen9 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen9} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("level_1")}
          >
            <ListItemIcon>
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary="Level 1" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("level_2")}
          >
            <ListItemIcon>
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary="Level 2" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("level_3")}
          >
            <ListItemIcon>
              <Icon>star</Icon>
            </ListItemIcon>
            <ListItemText primary="Level 3" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick10}>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Appointments" />
        {nestedopen10 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen10} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create Appointment Slot" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick11}>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Exams" />
        {nestedopen11 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen11} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("create_exam")}
          >
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create Exam" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => props.schoolSidebarSelect("view_exams")}
          >
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="View Exam" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button>
        <ListItemIcon>
          <Icon>time_to_leave</Icon>
        </ListItemIcon>
        <ListItemText primary="Leave Approvals" />
      </ListItem>

      <ListItem button>
        <ListItemIcon>
          <Icon>book</Icon>
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
