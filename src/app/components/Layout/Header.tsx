import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Box,
  List,
  ListItem,
  Link,
  Collapse
} from '@mui/material';
import { Lock, AccountBox, Menu as MenuIcon } from '@mui/icons-material';

const links = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact',  href: '/contact' }
];

export function Header() {
  const [ isMenuOpen, setIsMenuOpen ] = useState( false );
  const { pathname } = useLocation();

  let authLinks = [
    {
      label: 'Log-In',
      href: '/login',
      icon: <Lock />
    },
    {
      label: 'Sign-Up',
      href: '/signup',
      icon: <AccountBox />
    }
  ];

  /**
   * When redux logic implemented complete the following:
   * if isAuth === true, set authLinks = [
        {
          label: 'User Name',
          href: '/profile/username',
          icon: <someUserIcon />
        },
   * ]
   */

  return (
    <AppBar position = "static">
      <Toolbar>
        {/* App Logo */}
        <Link
          component = { NavLink }
          sx = {{ color: 'white' }}
          to = "/">
          <IconButton
            sx    = {{ mr: 2 }}
            size  = "large"
            edge  = "start"
            color = "inherit">
            LOGO
          </IconButton>
        </Link>
        {/* Responsivly Collapsable content */}
        <Collapse
          in = { isMenuOpen }
          sx = {{ width: 1, flexGrow: 1, display: { md: 'none' }}}>
          {/* Mobile Links */}
          <List>
            {
              links.map( link => (
                <Link
                  key          = { link.label }
                  component    = { NavLink }
                  to           = { link.href }
                  activeStyle  = {{ color: 'red' }}
                  exact        = { link.href === '/' }
                  sx           = {{ color: 'white' }}>
                  <ListItem>
                    { link.label }
                  </ListItem>
                </Link>
              ))
            }
          </List>

          {/* Mobile Auth Links */}
          <Box sx = {{ m: 1 }}>
            {
              authLinks.map( link => (
                <Link
                  key       = { link.label }
                  component = { NavLink }
                  to        = { link.href }>
                  <Button
                    endIcon = { link.icon }
                    color   = "primary"
                    sx      = {{ color: pathname === link.href ? 'red' : 'white', justifyContent: 'space-between' }}
                    fullWidth>
                      { link.label }
                  </Button>
                </Link>
              ))
            }
          </Box>
        </Collapse>
        {/* Responsive IconButton Menu */}
        <IconButton
          sx      = {{ display: { md: 'none' }}}
          size    = "large"
          edge    = "start"
          onClick = { () => setIsMenuOpen( prev => !prev ) }>
          <MenuIcon htmlColor = "white" />
        </IconButton>

        {/* Desktop Links */}
        <List sx = {{ flexGrow: 1, display: { xs: 'none', md: 'inline-flex' }}}>
          {
            links.map( link => (
              <Link
                key         = { link.label }
                component   = { NavLink }
                to          = { link.href }
                activeStyle = {{ color: 'red' }}
                exact       = { link.href === '/' }
                sx          = {{ color: 'white' }}>
                <ListItem>
                  { link.label }
                </ListItem>
              </Link>
            ))
          }
        </List>

        {/* Desktop Auth Links */}
        <Box sx = {{ display: { xs: 'none', md: 'block' }}}>
          {
            authLinks.map( link => (
              <Link
                key         = { link.label }
                component   = { NavLink }
                to          = { link.href }>
                <Button
                  sx      = {{ color: pathname === link.href ? 'red' : 'white' }}
                  endIcon = { link.icon }
                  color   = "primary">
                    { link.label }
                </Button>
              </Link>
            ))
          }
        </Box>
      </Toolbar>
    </AppBar>
  )
}
