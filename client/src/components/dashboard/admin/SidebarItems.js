import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";

import ManageInstituteModal from "./ManageInstituteModal";
import FeatureModal from "./FeatureModal";
import StandardModal from "./StandardModal";
import CategoryModal from "./CategoryModal";
import GrievanceCategoryModal from "./GrievanceCategoryModal";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(8) 
  }
}));

function SidebarItems() {
  const classes = useStyles();
  
  const [nestedopen0, setOpen0] = React.useState(false);
  const [nestedopen1, setOpen1] = React.useState(false);
  const [nestedopen2, setOpen2] = React.useState(false);
  const [nestedopen3, setOpen3] = React.useState(false);
  const [nestedopen4, setOpen4] = React.useState(false);
  const [nestedopen5, setOpen5] = React.useState(false);
  const [nestedopen6, setOpen6] = React.useState(false);
  const [openMIM, setOpen7] = React.useState(false);
  const [openFM, setOpen8] = React.useState(false);
  const [openSM, setOpen11] = React.useState(false);
  const [openCM, setOpen12] = React.useState(false);
  const [openGCM, setOpen13] = React.useState(false);
  
  function handleClick0() {
    setOpen0(!nestedopen0);
  }

  function handleClick1() {
    setOpen1(!nestedopen1);
  }

  function handleClick2() {
    setOpen2(!nestedopen2);
  }

  function handleClick3() {
    setOpen3(!nestedopen3);
  }

  function handleClick4() {
    setOpen4(!nestedopen4);
  }

  function handleClick5() {
    setOpen5(!nestedopen5);
  }

  function handleClick6() {
    setOpen6(!nestedopen6);
  }

  function handleMIMOpen() {
    setOpen7(true);
  }

  function handleMIMClose() {
    setOpen7(false);
  }

  function handleFMOpen() {
    setOpen8(true);
  }

  function handleFMClose() {
    setOpen8(false);
  }

  function handleSMOpen() {
    setOpen11(true);
  }

  function handleSMClose() {
    setOpen11(false);
  }

  function handleCMOpen() {
    setOpen12(true);
  }

  function handleCMClose() {
    setOpen12(false);
  }

  function handleGCMOpen() {
    setOpen13(true);
  }

  function handleGCMClose() {
    setOpen13(false);
  }

  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <Icon>dashboard</Icon>
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button onClick={handleClick0}>
        <ListItemIcon>
          <Icon>settings</Icon>
        </ListItemIcon>
        <ListItemText primary="Manage Institutions" />
        {nestedopen0 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen0} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} onClick={handleMIMOpen}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>
          <Dialog
            open={openMIM}
            onClose={handleMIMClose}
            aria-labelledby="manage_institute"
            maxWidth="sm"
            fullWidth
          >
            <ManageInstituteModal />
          </Dialog>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick1}>
        <ListItemIcon>
          <Icon>star</Icon>
        </ListItemIcon>
        <ListItemText primary="Features" />
        {nestedopen1 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create" onClick={handleFMOpen} />
          </ListItem>
          <Dialog
            open={openFM}
            onClose={handleFMClose}
            aria-labelledby="featute_modal"
            maxWidth="sm"
            fullWidth
          >
            <FeatureModal />
          </Dialog>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick2}>
        <ListItemIcon>
          <Icon>subscriptions</Icon>
        </ListItemIcon>
        <ListItemText primary="Subscriptions" />
        {nestedopen2 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>
          <ListItem button className={classes.nested}>
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

      <ListItem button onClick={handleClick3}>
        <ListItemIcon>
          <Icon>insert_drive_file</Icon>
        </ListItemIcon>
        <ListItemText primary="Tax" />
        {nestedopen3 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick4}>
        <ListItemIcon>
          <Icon>assistant</Icon>
        </ListItemIcon>
        <ListItemText primary="Standard" />
        {nestedopen4 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} onClick={handleSMOpen}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>
          <Dialog
            open={openSM}
            onClose={handleSMClose}
            aria-labelledby="manage_institute"
            maxWidth="sm"
            fullWidth
          >
            <StandardModal />
          </Dialog>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick5}>
        <ListItemIcon>
          <Icon>person</Icon>
        </ListItemIcon>
        <ListItemText primary="Category" />
        {nestedopen5 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen5} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} onClick={handleCMOpen}>
            <ListItemIcon>
              <Icon>edit</Icon>
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItem>
          <Dialog
            open={openCM}
            onClose={handleCMClose}
            aria-labelledby="category_modal"
            maxWidth="sm"
            fullWidth
          >
            <CategoryModal />
          </Dialog>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="List" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClick6}>
        <ListItemIcon>
          <Icon>error</Icon>
        </ListItemIcon>
        <ListItemText primary="Grievance Category" />
        {nestedopen6 ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItem>
      <Collapse in={nestedopen6} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} onClick={handleGCMOpen}>
            <ListItemIcon>
              <Icon>add_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Category" />
          </ListItem>
          <Dialog
            open={openGCM}
            onClose={handleGCMClose}
            aria-labelledby="gc_modal"
            maxWidth="sm"
            fullWidth
          >
            <GrievanceCategoryModal />
          </Dialog>
        </List>
      </Collapse>

      <Divider />

      <ListItem button>
        <ListItemIcon>
          <Icon>power_settings_new</Icon>
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  );
}

export default SidebarItems;
