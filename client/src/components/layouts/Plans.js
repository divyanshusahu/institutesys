import React from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  },
  pricingRoot: {
    padding: theme.spacing(8, 0, 6)
  },
  pricingCardHeader: {
    backgroundColor: theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2)
  }
}));

function Plans(props) {
  const [tiers, setTiers] = React.useState([]);

  React.useEffect(() => {
    axios.get("/api/subscriptions/list").then(res => {
      setTiers(
        res.data.item.map(subs => ({
          title: subs.name,
          subheader: "Min Users: " + subs.number_of_free_users,
          price: subs.price_per_user_per_month,
          descriptions: subs.features
        }))
      );
    });
  }, []);
  const classes = useStyles();

  const buySubscription = (name, price) => {
    axios.post("/api/payment/buy", { name: name, price: price }).then(res => {
      if (res.data.success) {
        window.open(res.data.redirect_url, "", "height=600,width=400");
      }
    });
  };

  return (
    <Container maxWidth="lg" component="main" style={{ marginTop: "5rem" }}>
      <Grid container spacing={5} alignItems="flex-end">
        {tiers.map(tier => (
          <Grid item key={tier.title} xs={12} sm={4}>
            <Card>
              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                className={classes.pricingCardHeader}
              />
              <CardContent>
                <div className={classes.cardPricing}>
                  <Typography component="h2" variant="h3" color="textPrimary">
                    ${tier.price}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    /mo
                  </Typography>
                </div>
                <ul>
                  {tier.descriptions.map(line => (
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={line}
                    >
                      {line}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  href={props.landing ? "/signup" : null}
                  onClick={
                    props.landing
                      ? null
                      : () => buySubscription(tier.title, tier.price)
                  }
                >
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Plans;
