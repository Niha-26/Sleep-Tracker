import React from 'react';
import { Route, Redirect } from "react-router-dom";
import * as _ from "lodash";
import { useLocation } from "react-router-dom";

const AccessRoute = ({children,renderWithoutLogin,...rest}) => {

    const currentLocation = useLocation();
    const redirect = (location, pathname) => {
        return (
          <Redirect
            to={{
              pathname: pathname,
              state: { from: location },
            }}
          />
        );
    };
    const redirectPathFilter = (
        location,
        pathname,
        children
      ) => {
        if (
          currentLocation.state === undefined ||
          currentLocation.state.from === undefined ||
          currentLocation.state.from.pathname !== pathname
        )
          return redirect(location, pathname);
        else return children;
    };

    return (
        <Route
          {...rest}
          render={({ location }) => {
            if (
              (renderWithoutLogin === false) ||
              currentLocation.pathname === "/dashboard"
            ) {
              return redirectPathFilter(location, "/dashboard", children);
            }
    
            return children;
          }}
        />
      );
}

export default AccessRoute;