import { useEffect }  from 'react';
import { useHistory } from 'react-router';
import { Box, SxProps, Theme, Alert, Grow } from '@mui/material';

const errorPageStyle: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
  bgcolor: 'error.main'
};

interface ErrorPageProps {
  message: string;
  name?: string;
  code?: number;
  redirect?: {
    in: number;
    to: string;
  };
}

export function ErrorPage( props: ErrorPageProps ) {
  const history = useHistory();

  useEffect(() => {
    const { redirect } = props;

    if ( redirect ) {
      setTimeout( () => history.push( redirect.to ), redirect.in );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx = { errorPageStyle }>
      <Box sx = {{ m: 'auto' }}>
        <Grow in = { true }>
          <Alert
            sx       = {{ m: 'auto' }}
            severity = "error">
              { props.message }
          </Alert>
        </Grow>
      </Box>
    </Box>
  )
}
