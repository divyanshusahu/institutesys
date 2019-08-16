import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    marginTop: "auto"
  }
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography
        variant="body2"
        component="p"
        align="center"
        color="textSecondary"
      >
        {"Copyright © " + new Date().getFullYear() + " "}
        <Link color="inherit" href="#">Amtica Limited</Link>
      </Typography>
    </footer>
  );
}

export default Footer;