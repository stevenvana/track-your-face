import React from "react";
import { StylesProvider, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import withFirebaseAuth from "react-with-firebase-auth";
import TrackYourFace from "./TrackYourFace";
import { StyledLoginPage } from "./styled";
import { firebaseApp, providers } from "./firebase";

const firebaseAppAuth = firebaseApp.auth();

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function App(props) {
  const { user, signOut, signInWithGoogle } = props;
  const classes = useStyles();

  return (
    <div>
      <StylesProvider injectFirst>
        {user ? (
          <TrackYourFace signOut={signOut} user={user} />
        ) : (
          <StyledLoginPage>
            <p>Please sign in to Track Your Face.</p>
            <Button
              onClick={signInWithGoogle}
              variant="contained"
              className={classes.button}
              color="primary"
            >
              Sign in with Google
            </Button>
          </StyledLoginPage>
        )}
      </StylesProvider>
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);

App.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    emailVerified: PropTypes.bool,
    metadata: PropTypes.shape({
      A: PropTypes.func,
      a: PropTypes.string,
      b: PropTypes.string,
      creationTime: PropTypes.string,
      lastSignInTime: PropTypes.string
    }),
    uid: PropTypes.string.isRequired
  }),
  signOut: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired
};

App.defaultProps = {
  user: {
    displayName: "Dummy User",
    emailVerified: true,
    metadata: {
      a: "1573209113041",
      b: "1573245230365",
      creationTime: "Fri, 08 Nov 2019 10:31:53",
      lastSignInTime: "Fri, 08 Nov 2019"
    },
    uid: "5kanNRnKTwhLbaWQFH1ccpvoyRw4"
  }
};
