import { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
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

const validationSchema = yup.object({
  username: yup.string().required().email(),
  password: yup.string().required().min(6),
  rememberMe: yup.boolean().optional()
});

interface ValidationSchema {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: ( loginData: ValidationSchema ) => void;
  onRecoveryRequest: ( email: string ) => void;
}

export function LoginDialog( props: LoginDialogProps ) {
  const [ showPassword, setShowPassword ]   = useState( false );
  const [ isFPDialogOpen, setFPDialogOpen ] = useState( false );

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
      touchedFields
    },
    setValue
  } = useForm<ValidationSchema>({
    resolver: yupResolver( validationSchema ),
    mode: 'all'
  });

  const userNameRef = useRef<HTMLInputElement>( null );

  useEffect(() => {
    if ( props.isOpen ) {
      setTimeout( () => userNameRef?.current?.focus(), 500 );
    }
  }, [ props.isOpen ]);
  
  const handleDemoLogin = () => {
    setValue( 'username', 'example@demo.com' );
    setValue( 'password', 'as12Df@' );
    handleSubmit( props.onLogin )();
  };

  return (
    <Dialog
      open = { props.isOpen }
      onBackdropClick = { props.onClose }>
      <DialogTitle><Lock /> Log-In</DialogTitle>

      <form onSubmit = { handleSubmit( props.onLogin ) }>
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
            variant  = "filled"
            label    = "Username"
            inputRef = { userNameRef }
            { ...register( 'username' ) }
            error      = { touchedFields.username && Boolean( errors.username ) }
            helperText = { touchedFields.username && errors.username?.message }
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
            { ...register( 'password' ) }
            error      = { touchedFields.password && Boolean( errors.password ) }
            helperText = { touchedFields.password && errors.password?.message }
            fullWidth
          />

          <Box sx = {{ width: 1, display: 'flex', justifyContent: 'space-between', margin: 1 }}>
            <FormGroup>
              <FormControlLabel
                { ...register( 'rememberMe' ) }
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
            disabled = { !isValid }
            color = "success"
            type  = "submit">
              Log-In
          </Button>
        </DialogActions>
      </form>

      <RecoveryDialog
        isOpen  = { isFPDialogOpen }
        onClose = { () => setFPDialogOpen( false ) }
        onRecoveryRequest = { props.onRecoveryRequest }
      />
    </Dialog>
  )
}
