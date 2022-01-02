import { Switch, Route, Redirect } from 'react-router-dom';

import {
  HomePage,
  AboutPage,
  ContactPage,
  ProductsPage,
  ProductReviewPage,
  CartPage,
  PageNotFound
} from './pages';

export function AppRouting() {
  return (
    <Switch>
      {/* Routes paths */}
      <Route path = "/"             component = { HomePage } exact />
      <Route path = "/about"        component = { AboutPage } />
      <Route path = "/contact"      component = { ContactPage } />
      <Route path = "/products/:id" component = { ProductReviewPage } />
      <Route path = "/products"     component = { ProductsPage } />
      <Route path = "/cart"         component = { CartPage } />
      {/* Redirects Cases */}
      <Redirect path = "/home" to = "/" />
      {/* 404 Case */}
      <Route path = "*"             component = { PageNotFound } />
    </Switch>
  )
}
