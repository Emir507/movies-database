import React, { useEffect, useState, createContext } from 'react';
import firebase from '../Firebase';

export const AuthUserContext = createContext();

const withAuthent = Component => {
  class withAuthent extends React.Component {
    constructor(props){
      super (props);

      this.state = {
        authUser: null,
      }

    }

    componentDidMount() {
      this.listener = firebase.auth().onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null})
        }
      )
    }
    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props}/>
        </AuthUserContext.Provider>
      )
    }
  }
  return withAuthent;
}

export default withAuthent;