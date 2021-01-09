import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isSignedIn, handleSignin, handleClose, ...props }) => {
  const [isSignupPopupOpen, setIsSignupPopupOpen] = React.useState(false);
  React.useEffect(() => {
    !isSignedIn && isSignupPopupOpen ? handleSignin(isSignupPopupOpen) : handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignupPopupOpen]);

  if (isSignedIn) {
    return (
      <Route >
        <Component {...props} />
      </Route>
    )
  } else {
    //calling handleOpenSigin here directly would result to "cannot update component while
    //rendering another component" error, so use a hook instead as you cannot call parent's
    //set state outside useEffect()."
    !isSignupPopupOpen && setIsSignupPopupOpen(true);
    return (
      <Route >
        <Redirect to={{ pathname: '/', openSignin: true }} />
      </Route>
    )
  }
}

export default ProtectedRoute;
