import React from "react";
import { StylesProvider, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import SimpleTabs from "./SimpleTabs";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

import { StyledLoginPage } from "./styled";
import PropTypes from "prop-types";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

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
    <div style={{ background: "#3f50b5", height: "100vh" }}>
      <StylesProvider injectFirst>
        {user ? (
          <SimpleTabs signOut={signOut} />
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

// export default App;
export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);

// App.propTypes = { user, signOut, signInWithGoogle }
