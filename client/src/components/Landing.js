import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Icon from "@material-ui/core/Icon";
import WOW from "wowjs";

import background from "../assets/images/background.jpeg";
import storage from "../assets/images/storage.svg";
import security from "../assets/images/security.svg";
import support from "../assets/images/support.svg";

const useStyles = makeStyles(theme => ({
  landingContainer: {
    backgroundColor: "#f5f3f4",
    paddingRight: 0,
    paddingLeft: 0,
    height: window.innerWidth > 576 ? "70vh" : "100vh"
  },
  landingImage: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "top right"
  },
  landingContentAlign: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    height: "100%"
  },
  landingContent: {
    margin: 0,
    textAlign: "center"
  },
  landingContentChild: {
    marginBottom: theme.spacing(8)
  },
  featuresRoot: {
    flexGrow: 1,
    marginTop: theme.spacing(10)
  },
  featureCard: {
    boxShadow: "none"
  },
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

const tiers = [
  {
    title: "Silver",
    subheader: "Min Users: 20",
    trial: "Trial 20 days FREE trial",
    price: 20,
    description: [
      "Assignments",
      "e-commerce",
      "Exams",
      "Message Book",
      "WebRTC",
      "Appoinments",
      "Dropbox",
      "Leave Management"
    ],
    buttonText: "Get Started",
    buttonVariant: "outlined"
  },
  {
    title: "Bronze",
    subheader: "Min Users: 10",
    price: 10,
    description: ["Appointment", "Leave Management"],
    buttonText: "Get Started",
    buttonVariant: "contained"
  },
  {
    title: "Platinum",
    subheader: "Min Users: 1",
    price: 30,
    description: [
      "Assignments",
      "e-commerce",
      "Exams",
      "Message Book",
      "WebRTC",
      "Appoinments",
      "Dropbox",
      "Leave Management"
    ],
    buttonText: "Get Started",
    buttonVariant: "outlined"
  }
];

function Landing() {
  const classes = useStyles();

  useEffect(() => {
    new WOW.WOW().init();
  });

  return (
    <div>
      <Container maxWidth="xl" className={classes.landingContainer}>
        <div
          className={window.innerWidth >= 992 ? classes.landingImage : null}
          style={{ height: "100%" }}
        >
          <div className={classes.landingContentAlign}>
            <Container
              maxWidth={window.innerWidth >= 1367 ? "md" : "sm"}
              className={classes.landingContent}
            >
              <Typography
                variant="h3"
                className={classes.landingContentChild}
              >
                Securely connect, sync, and collaborate
              </Typography>
              <Typography
                variant="h6"
                className={classes.landingContentChild}
              >
                Institute System is the secure institite system that teachers
                and students love and trust
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.landingContentChild}
              >
                Try Now
              </Button>
            </Container>
          </div>
        </div>
      </Container>

      <div id="features" className={classes.featuresRoot}>
        <Typography variant="h3" align="center" color="primary" gutterBottom>
          FEATURES
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Get all the features your business needs
        </Typography>
        <Container maxWidth="lg" style={{ marginTop: "5rem" }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                className={classes.featureCard + " wow zoomIn"}
                data-wow-duration="1s"
                data-wow-offset="100"
              >
                <CardContent>
                  <Typography variant="h5" align="center" gutterBottom>
                    Flexible Storage Plans
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                    gutterBottom
                  >
                    Choose the right plan to ensure your team has the space it
                    needs to be productive.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                className={classes.featureCard + " wow zoomIn"}
                data-wow-duration="1s"
                data-wow-offset="100"
              >
                <CardContent>
                  <Typography variant="h5" align="center" gutterBottom>
                    File and Version Recovery
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                    gutterBottom
                  >
                    Easily recover deleted files and restore previous file
                    versions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                className={classes.featureCard + " wow zoomIn"}
                data-wow-duration="1s"
                data-wow-offset="100"
              >
                <CardContent>
                  <Typography variant="h5" align="center" gutterBottom>
                    Team Folder Manager
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                    gutterBottom
                  >
                    Get visibility and control over team folders, including
                    sync management.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                className={classes.featureCard + " wow zoomIn"}
                data-wow-duration="1s"
                data-wow-offset="100"
              >
                <CardContent>
                  <Typography variant="h5" align="center" gutterBottom>
                    Link permissions
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                    gutterBottom
                  >
                    Password-protect your links, disable downloads, or set
                    expiration dates to grant temporary access.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                className={classes.featureCard + " wow zoomIn"}
                data-wow-duration="1s"
                data-wow-offset="100"
              >
                <CardContent>
                  <Typography variant="h5" align="center" gutterBottom>
                    Dropbox Paper
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                    gutterBottom
                  >
                    A simple, powerful way to create, share, and keep your
                    team in sync — with the added benefit of admin controls.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                className={classes.featureCard + " wow zoomIn"}
                data-wow-duration="1s"
                data-wow-offset="100"
              >
                <CardContent>
                  <Typography variant="h5" align="center" gutterBottom>
                    Smart Sync
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="center"
                    gutterBottom
                  >
                    Access every file in their Dropbox, right from their
                    desktop, using very little hard disk space.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div id="pricing" className={classes.pricingRoot}>
        <Container maxWidth="md" component="main">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="primary"
            gutterBottom
          >
            PRICING
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            Institue System helps your company grow without limits, while you
            maintain complete control over important company information and
            user activity.
          </Typography>
        </Container>
        <Container
          maxWidth="lg"
          component="main"
          style={{ marginTop: "5rem" }}
        >
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map(tier => (
              <Grid item key={tier.title} xs={12} sm={4}>
                <Card
                  className="wow zoomIn"
                  data-wow-duration="1s"
                  data-wow-offset="50"
                >
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    className={classes.pricingCardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography
                        component="h2"
                        variant="h3"
                        color="textPrimary"
                      >
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /mo
                      </Typography>
                    </div>
                    <ul>
                      {tier.description.map(line => (
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
                      variant={tier.buttonVariant}
                      color="primary"
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

      <div id="aboutus" style={{ marginTop: "5rem" }}>
        <Typography
          variant="h3"
          align="center"
          color="primary"
          gutterBottom
          component="p"
        >
          ABOUT US
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          Designed to take teamwork to the next level
        </Typography>
        <Container maxWidth="lg" style={{ marginTop: "5rem" }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Card
                elevation={0}
                className="wow zoomIn"
                data-wow-duration="1s"
                data-wow-offset="100"
              >
                <CardMedia
                  image={storage}
                  title="Flexible Storage"
                  component="img"
                  style={{ width: "40%", margin: "auto" }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="p"
                    align="center"
                    color="textSecondary"
                    gutterBottom
                  >
                    Space for Sharing and Collaboration
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                elevation={0}
                className="wow zoomIn"
                data-wow-duration="1s"
                data-wow-offset="100"
              >
                <CardMedia
                  style={{ width: "40%", margin: "auto" }}
                  image={security}
                  title="Flexible Storage"
                  component="img"
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="p"
                    align="center"
                    color="textSecondary"
                    gutterBottom
                  >
                    Advanced Security Features
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                elevation={0}
                className="wow zoomIn"
                data-wow-duration="1s"
                data-wow-offset="100"
              >
                <CardMedia
                  image={support}
                  title="Flexible Storage"
                  component="img"
                  style={{ width: "40%", margin: "auto" }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="p"
                    align="center"
                    color="textSecondary"
                    gutterBottom
                  >
                    Dedicated Live Support
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div id="contactus" style={{ marginTop: "5rem" }}>
        <Typography
          variant="h3"
          component="p"
          color="primary"
          align="center"
          gutterBottom
        >
          CONTACT SALES
        </Typography>
        <Container maxWidth="lg" style={{marginTop: "5rem"}}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Card elevation={0}>
                <CardContent align="center">
                  <Icon fontSize="large">chat_bubble_outline</Icon>
                  <Typography
                    variant="h6"
                    component="p"
                    color="textSecondary"
                  >
                    Chat
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card elevation={0}>
                <CardContent align="center">
                  <Icon fontSize="large">email</Icon>
                  <Typography
                    variant="h6"
                    component="p"
                    color="textSecondary"
                  >
                    Email
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card elevation={0}>
                <CardContent align="center">
                  <Icon fontSize="large">phone</Icon>
                  <Typography
                    variant="h6"
                    component="p"
                    color="textSecondary"
                  >
                    +44 8552376726
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Landing;
