import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Box,
  List,
  ListItem
} from '@mui/material';

import { LoginDialog } from '../../components';

const links = [
  { label: 'Home',     href: '/home' },
  { label: 'About',    href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact',  href: '/contact' }
];

interface HeaderProps {}

export function Header( props: HeaderProps ) {
  const [ isLoginDialogOpen, setIsLoginDialogOpen ] = useState( false );

  const handleLoginRequest = ( data: any ) => {
    console.log( data );
  };

  const handleRecoveryRequest = ( email: string ) => {
    console.log( email );
  };

  return (
    <AppBar position = "static">
      <Toolbar>
        <IconButton
          sx    = {{ mr: 2 }}
          size  = "large"
          edge  = "start"
          color = "inherit">
          Test
        </IconButton>

        <List sx = {{ flexGrow: 1, display: 'inline-flex', color: 'inherit' }}>
          {
            links.map( link => (
              <Link
                key  = { link.label }
                to   = { link.href }>
                  <ListItem>{ link.label }</ListItem>
              </Link>
            ))
          }
        </List>

        <Box>
          <Button color = "inherit" onClick = { () => setIsLoginDialogOpen( true ) }>Log-In</Button>
          <Button color = "inherit">Sign-Up</Button>
        </Box>
      </Toolbar>

      <LoginDialog
        isOpen  = { isLoginDialogOpen }
        onClose = { () => setIsLoginDialogOpen( false ) }
        onLogin = { handleLoginRequest }
        onRecoveryRequest = { handleRecoveryRequest }
      />
    </AppBar>
  )
}
