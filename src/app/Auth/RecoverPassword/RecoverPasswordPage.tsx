import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  Box,
  TextField,
  Button,
  SxProps,
  Theme,
  Alert,
  Grow,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Password, Visibility, VisibilityOff } from '@mui/icons-material';


const recoverPasswordPageStyle: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
  bgcolor: 'primary.main',
  width: 1
};

const recoverPasswordBoxStyle: SxProps<Theme> = {
  margin: 'auto',
  p: 2,
  bgcolor: 'primary.light',
  borderRadius: 2
};

const validationSchema = yup.object({
  password:  yup.string().required().min(6),
  confirmPassword: yup.string()
    .required( 'password is a required field' )
    .min( 6, 'password must be at least 6 characters' )
    .oneOf([ yup.ref( 'password' ) ], 'Passwords do not match!' )
});

interface ValidationSchema {
  password: string;
  confirmPassword: string;
}

type AlertType = {
  severity: 'error' | 'info' | 'success' | 'warning';
  message:  string;
}

interface RecoverPasswordPageProps extends RouteComponentProps {}

export default function RecoverPasswordPage( props: RecoverPasswordPageProps ) {
  const [ isLoading, setIsLoading ]       = useState( true );
  const [ isReady, setIsReady ]           = useState( false ); // A State after validating token.
  const [ showPassword, setShowPassword ] = useState( false );
  const [ alert, setAlertProps ] = useState<AlertType>();
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
      isSubmitted,
      touchedFields
    }
  } = useForm<ValidationSchema>({
    resolver: yupResolver( validationSchema ),
    mode: 'all'
  });

  useEffect(() => {
    const token = new URLSearchParams( props.location.search ).get( 'token' );
    // MAKE HTTP_REQUEST to validate Token!
    if ( token ) {
      setTimeout(() => {
        setIsLoading( false );
        setIsReady( true );
        setAlertProps({
          severity: 'success',
          message: 'Token is valid!'
        });
      }, 3000);
    } else {
      props.history.push( '/' );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRecoveryRequest = ( data: ValidationSchema ) => {
    console.log( data );
  };

  const passwordInputProps = {
    startAdornment: (
      <InputAdornment position = "start">
        <Password />
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment
        position = "end">
          <IconButton onClick = { () => setShowPassword( prev => !prev )}>
              { showPassword ? <VisibilityOff /> : <Visibility /> }
          </IconButton>
      </InputAdornment>
    )
  };

  return (
    <Box sx = { recoverPasswordPageStyle }>
      { isLoading && !isReady && <CircularProgress sx = {{ m: 'auto' }} color = "secondary" size = { 75 } /> }

      <Grow
        in = { isReady && !isLoading }
        hidden = { isLoading && !isReady }>
        <Box sx = { recoverPasswordBoxStyle }>
          {
            alert &&
            <Box sx = {{ m: 'auto' }}>
              <Grow in = { true }>
                <Alert severity = { alert.severity }>
                  { alert.message }
                </Alert>
              </Grow>
            </Box>
          }
          <Box
            component = "form"
            onSubmit  = { handleSubmit( handleRecoveryRequest ) }>
            <Box>
              <TextField
                { ...register( 'password' ) }
                type       = { showPassword ? 'text' : 'password' }
                label      = { 'Password' }
                InputProps = { passwordInputProps }
                error      = { touchedFields.password && Boolean( errors.password) }
                helperText = { touchedFields.password && errors.password?.message }
                margin     = "dense"
                variant    = "filled"
                fullWidth
              />
              <TextField
                // @ts-ignore
                { ...register( 'confirmPassword' ) }
                type       = { showPassword ? 'text' : 'password' }
                label      = { 'Re-type to Confirm' }
                InputProps = { passwordInputProps }
                error      = { touchedFields.confirmPassword && Boolean( errors.confirmPassword) }
                helperText = { touchedFields.confirmPassword && errors.confirmPassword?.message }
                margin     = "dense"
                variant    = "filled"
                fullWidth
              />
            </Box>

            {/* Form Actions / Submit Button */}
            <Box sx = {{ marginTop: 2 }}>
              <Button
                type     = "submit"
                disabled = { !isValid || isSubmitted }
                variant  = "contained"
                color    = "primary"
                fullWidth>
                  { isSubmitted ? <CircularProgress sx = {{ m: 'auto' }} color = "secondary" /> : 'Set Password' }
              </Button>
            </Box>
          </Box>
        </Box>
      </Grow>
    </Box>
  )
}
