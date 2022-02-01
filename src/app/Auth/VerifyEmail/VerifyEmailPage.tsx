import { useEffect, useState }  from 'react';
import { RouteComponentProps }  from 'react-router-dom';
import {
  Box,
  SxProps,
  Theme,
  Alert,
  Grow,
  LinearProgress
} from '@mui/material';

const verifyEmailPageStyle: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
  bgcolor: 'info.main'
};

type AlertType = {
  severity: 'error' | 'info' | 'success' | 'warning';
  message:  string;
}

interface VerifyEmailPageProps extends RouteComponentProps {}

export default function VerifyEmailPage( props: VerifyEmailPageProps ) {
  const [ isLoading, setIsLoading ] = useState( true );
  const [ alert, setAlertProps ] = useState<AlertType>();

  useEffect(() => {
    const token = new URLSearchParams( props.location.search ).get( 'token' );
    // MAKE HTTP_REQUEST THEN SET MESSAGE!
    if ( token ) {
      setTimeout(() => {
        console.log(token);
        setIsLoading( false );
        setAlertProps({
          severity: 'success',
          message: 'Your email has been verified successfully!'
        })
      }, 1500);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx = { verifyEmailPageStyle }>
      { isLoading && <LinearProgress /> }
      {
        alert &&
        <Box sx = {{ m: 'auto' }}>
          <Grow in = { Boolean( alert ) }>
            <Alert severity = { alert.severity }>
              { alert.message }
            </Alert>
          </Grow>
        </Box>
      }
    </Box>
  )
}
