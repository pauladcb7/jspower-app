import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { isLogged } from '../utils';


export const LoginRoute = ({component: Component, ...rest}) => {
  const user = useSelector(store => store.user);
  
  return (
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route {...rest} render={props => (
          !user ?
            <Component {...props} />
          : <Redirect to="/" />
      )} />
  );
};