import { useState, useEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Link,
  SxProps,
  Theme
} from '@mui/material';
import {
  Email,
  Password,
  Visibility,
  VisibilityOff,
  AccountBox,
  LockOpen
} from '@mui/icons-material';

import { RecoveryDialog } from '../../components';

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

const loginPageStyle: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
  width: 1,
  background: 'linear-gradient(to right,rgba(247,84,9,.788),rgba(204,82,241,.678))'
};

const loginBoxStyle: SxProps<Theme> = {
  margin: 'auto',
  padding: 2,
  borderRadius: 3,
  width: 0.4,
  background: 'rgba(0, 0, 0, 0.1)',
  minWidth: 300,
  maxWidth: 600
};

const loginLogoContainerStyle: SxProps<Theme> = {
  width: 1,
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  marginBottom: 2,
  '& img': {
    borderRadius: '50%',
    boxShadow: '0 0 10px white'
  }
};

const rememberMeContainerStyle: SxProps<Theme> = {
  width: 1,
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 1,
  marginBottom: 1
};

interface LoginPageProps extends RouteComponentProps {}

export default function LoginPage( props: LoginPageProps ) {
  const [ isRecoveryDialogOpen, setIsRecoveryDialogOpen ] = useState( false );
  const [ showPassword, setShowPassword ] = useState( false );

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isValid,
      touchedFields
    }
  } = useForm<ValidationSchema>({
    resolver: yupResolver( validationSchema ),
    mode: 'all'
  });

  const userNameRef = useRef<HTMLInputElement>( null );

  useEffect(() => {
    setTimeout( () => userNameRef?.current?.focus(), 500 );
  }, []);

  const handleLogin = ( loginData: ValidationSchema ) => {
    console.log( loginData );
  };
  
  const handleDemoLogin = () => {
    setValue( 'username', 'example@demo.com' );
    setValue( 'password', 'as12Df@' );
    handleSubmit( handleLogin )();
  };

  const handleRecoveryRequest = ( email: string ) => {
    console.log( email );
  };

  return (
    <Box sx = { loginPageStyle }>
      <Box sx = { loginBoxStyle }>
        <Box sx = { loginLogoContainerStyle }>
          <img
            src = "https://angular-dummy-project.herokuapp.com/assets/images/login-logo.png"
            alt = "Log-In logo" />
        </Box>

        <Box
          component = "form"
          onSubmit  = { handleSubmit( handleLogin ) }>
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
                  position = "end">
                    <IconButton onClick = { () => setShowPassword( prev => !prev )}>
                      { showPassword ? <VisibilityOff /> : <Visibility /> }
                    </IconButton>
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

          <Box sx = { rememberMeContainerStyle }>
            <FormGroup>
              <FormControlLabel
                { ...register( 'rememberMe' ) }
                control = { <Checkbox /> }
                label   = "Remember Me" />
            </FormGroup>

            <Link
              component = "button"
              onClick   = { () => setIsRecoveryDialogOpen( true ) }>
              Forgot Password?
            </Link>
          </Box>

          <Button
            variant = "contained"
            startIcon = { <AccountBox /> }
            onClick = { handleDemoLogin }
            color   = "warning">
              Log-In as Demo User
          </Button>

          <Box sx = {{ marginTop: 2 }}>
            <Button
              type     = "submit"
              disabled = { !isValid }
              endIcon  = { <LockOpen /> }
              variant  = "contained"
              color    = "primary"
              fullWidth>
                Log-In
            </Button>
          </Box>
        </Box>
      </Box>

      <RecoveryDialog
        isOpen  = { isRecoveryDialogOpen }
        onClose = { () => setIsRecoveryDialogOpen( false ) }
        onRecoveryRequest = { handleRecoveryRequest }
      />
    </Box>
  )
}
