import { Switch, Route, Redirect } from 'react-router-dom';

import {
  LoginPage,
  SignupPage,
  VerifyEmailPage,
  RecoverPasswordPage
} from './Auth';
import {
  HomePage,
  AboutPage,
  ContactPage,
  ProductsPage,
  ProductReviewPage,
  CartPage,
  ErrorPage
} from './pages';

export function AppRouting() {
  const isAuth  = false;

  const unAuthorizedError = () => {
    return (
      <ErrorPage
        name     = "UNAUTHORIZED"
        code     = { 401 }
        message  = "You're not allowed to visit this route!"
        redirect = {{
          in: 1500,
          to: '/'
        }}
      />
    );
  };

  return (
    <Switch>
      {/* Routes Paths */}
      <Route path = "/"             component = { HomePage } exact />
      <Route path = "/about"        component = { AboutPage } />
      <Route path = "/contact"      component = { ContactPage } />
      <Route path = "/products/:id" component = { ProductReviewPage } />
      <Route path = "/products"     component = { ProductsPage } />
      <Route path = "/cart"         component = { CartPage } />
      {/* Auth Routes */}
      <Route path = "/auth/login"  render = { props => isAuth ? unAuthorizedError() : <LoginPage  { ...props } /> } />
      <Route path = "/auth/signup" render = { props => isAuth ? unAuthorizedError() : <SignupPage { ...props } /> } />
      <Route path = "/auth/verify/email"     component = { VerifyEmailPage } />
      <Route path = "/auth/password/recover" component = { RecoverPasswordPage } />
      {/* Redirects Cases */}
      <Redirect path = "/home" to = "/" />
      {/* 404 Case */}
      <Route path = "*">
        <ErrorPage
          name    = "NOT FOUND"
          code    = { 404 }
          message = "Sorry, we couldn't find the page you were looking for :("
        />
      </Route>
    </Switch>
  )
}
