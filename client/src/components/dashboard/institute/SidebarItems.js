import React from "react";

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
        <ListItemText primary="Manage Branches" />
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

      <ListItem button>
        <ListItemIcon>
          <Icon>subscriptions</Icon>
        </ListItemIcon>
        <ListItemText primary="My Plan" />
      </ListItem>

      <Divider />

      <ListItem button>
        <ListItemIcon>
          <Icon>shoping_basket</Icon>
        </ListItemIcon>
        <ListItemText primary="Buy Plan" />
      </ListItem>

      <Divider />

      <ListItem button>
        <ListItemIcon>
          <Icon>power_settings_new</Icon>
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>

      <Divider />
    </div>
  );
}

export default SidebarItems;
