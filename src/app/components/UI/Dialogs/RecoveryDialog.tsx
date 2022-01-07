import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment
} from '@mui/material';
import { Email } from '@mui/icons-material';

const validationSchema = yup.object({
  username: yup.string().required().email()
});

interface ValidationSchema {
  username: string;
}

interface RecoveryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRecoveryRequest: ( email: string ) => void;
}

export function RecoveryDialog( props: RecoveryDialogProps ) {
  const {
    register,
    handleSubmit,
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
    if ( props.isOpen ) {
      setTimeout( () => userNameRef?.current?.focus(), 500 );
    }
  }, [ props.isOpen ]);

  return (
    <Dialog
      open = { props.isOpen }
      onBackdropClick = { props.onClose }>
      <DialogTitle>Password Recovery</DialogTitle>

      <form onSubmit = { handleSubmit( data => props.onRecoveryRequest( data.username )) }>
        <DialogContent>
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
          <DialogContentText>We will send to your email a link to reset the password! check your mailbox for next steps.</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color   = "error"
            onClick = { props.onClose }>
              Close
          </Button>
          <Button
            disabled = { !isValid }
            type  = "submit"
            color = "success">
              Recover
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
