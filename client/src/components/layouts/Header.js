import React from "react";
import { Link as RLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Link from "@material-ui/core/Link";

import logo from "../../assets/images/logo.png";

const useStyles = makeStyles(theme => ({
  navbar: {
    backgroundColor: "white"
  },
  navbarLogo: {
    flexGrow: 1
  },
  navbarButtons: {
    marginRight: theme.spacing(2)
  }
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired
};

function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <HideOnScroll {...props}>
      <div>
        <AppBar className={classes.navbar} elevation={1}>
          <Toolbar>
            <div className={classes.navbarLogo}>
              <Link to="/" component={RLink}>
                <img src={logo} alt="logo" title="Institute System" />
              </Link>
            </div>
            <div>
              <Hidden smUp>
                <IconButton
                  aria-controls="collapsible-navbar"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <Icon>menu</Icon>
                </IconButton>
                <Menu
                  id="collapsible-navbar"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>Features</MenuItem>
                  <MenuItem>Pricing</MenuItem>
                  <MenuItem>About Us</MenuItem>
                  <MenuItem>Contact</MenuItem>
                  <MenuItem>Login</MenuItem>
                </Menu>
              </Hidden>
              <Hidden xsDown>
                <Link href="#features" color="inherit">
                  <Button className={classes.navbarButtons}>Features</Button>
                </Link>
                <Link href="#pricing" color="inherit">
                  <Button className={classes.navbarButtons}>Pricing</Button>
                </Link>
                <Link href="#aboutus" color="inherit">
                  <Button className={classes.navbarButtons}>About Us</Button>
                </Link>
                <Link href="#aboutus" color="inherit">
                  <Button className={classes.navbarButtons}>Contact</Button>
                </Link>
                <Link to="/login" component={RLink} color="inherit">
                  <Button
                    className={classes.navbarButtons}
                    variant="outlined"
                    color="primary"
                  >
                    Login
                  </Button>
                </Link>
              </Hidden>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </HideOnScroll>
  );
}

export default Header;
