import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Link
} from '@mui/material';
import {
  Lock,
  Email,
  Password,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { RecoveryDialog } from '../../../components';

type LoginData = {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: ( loginData: LoginData ) => void;
  onRecoveryRequest: ( email: string ) => void;
}

export function LoginDialog( props: LoginDialogProps ) {
  const [ showPassword, setShowPassword ]   = useState( false );
  const [ isFPDialogOpen, setFPDialogOpen ] = useState( false );

  const handleDemoLogin = () => {
    // set auto username & pass
    //props.onLogin(  );
  };

  return (
    <Dialog
      open = { props.isOpen }
      onBackdropClick = { props.onClose }>
      <DialogTitle><Lock /> Log-In</DialogTitle>

      <DialogContent dividers>
        <DialogContentText>
          Please fill the following information in order to log-in.
        </DialogContentText>
        <TextField
          InputProps = {{
            startAdornment: (
              <InputAdornment position = "start">
                <Email />
              </InputAdornment>
            )
          }}
          variant = "filled"
          label   = "Username"
          fullWidth
        />
        <TextField
          InputProps = {{
            startAdornment: (
              <InputAdornment position = "start">
                <Password />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                sx = {{ cursor: 'pointer' }}
                position = "end"
                onClick = { () => setShowPassword( prev => !prev )}>
                { showPassword ? <VisibilityOff /> : <Visibility /> }
              </InputAdornment>
            )
          }}
          type    = { showPassword ? 'text' : 'password' }
          variant = "filled"
          label   = "Password"
          fullWidth
        />

        <Box sx = {{ width: 1, display: 'flex', justifyContent: 'space-between', margin: 1 }}>
          <FormGroup>
            <FormControlLabel
              control = { <Checkbox /> }
              label   = "Remember Me" />
          </FormGroup>

          <Link
            component = "button"
            onClick = { () => setFPDialogOpen( true ) }>
            Forgot Password?
          </Link>
        </Box>

        <Button onClick = { handleDemoLogin } color = "warning">Log-In as Demo User</Button>
      </DialogContent>

      <DialogActions>
        <Button
          color   = "inherit"
          onClick = { props.onClose }>
            Close
        </Button>
        <Button
          color   = "success"
          onClick = { () => props.onLogin({ username: 'username', password: 'pass', rememberMe: false }) }>
            Log-In
        </Button>
      </DialogActions>

      <RecoveryDialog
        isOpen  = { isFPDialogOpen }
        onClose = { () => setFPDialogOpen( false ) }
        onRecoveryRequest = { props.onRecoveryRequest }
      />
    </Dialog>
  )
}
