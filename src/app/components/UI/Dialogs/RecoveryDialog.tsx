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
import { useEffect, useRef } from 'react';

interface RecoveryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRecoveryRequest: ( email: string ) => void;
}

export function RecoveryDialog( props: RecoveryDialogProps ) {
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
          color   = "success"
          onClick = { () => props.onRecoveryRequest( 'test@test.com' ) }>
            Recover
        </Button>
      </DialogActions>
    </Dialog>
  )
}
