import { ChangeEvent, useState, useRef, useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  SxProps,
  Theme,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Grow,
  Alert,
  Tooltip
} from '@mui/material';
import {
  Email,
  Password,
  Visibility,
  VisibilityOff,
  AccountBoxOutlined,
  Label as LabelIcon,
  Verified,
  Image as ImageIcon
} from '@mui/icons-material';

const ALLOWED_MIME_TYPE = ['image/png', 'image/jpeg', 'image/jpg'];

const validateImageType = ( file: File ) => !file || ( file && ALLOWED_MIME_TYPE.includes( file.type ));
const validateImageSize = ( file: File ) => !file || ( file && file.size < 2097152 );

const validationSchema = yup.object({
  firstName: yup.string().required().min(3),
  lastName:  yup.string().required().min(3),
  username:  yup.string().required().min(3).max(20), // should .matches with regex
  email:     yup.string().required().email(),
  password:  yup.string().required().min(6),
  confirmPassword: yup.string()
    .required( 'password is a required field' )
    .min( 6, 'password must be at least 6 characters' )
    .oneOf([ yup.ref( 'password' ) ], 'Passwords do not match!' ),
  image:    yup.mixed()
    .test( 'is-valid-type', 'Invalid file, please pick an image! jpg, jpeg or png!', validateImageType )
    .test( 'is-valid-size', 'The profile image is too big, Max 2MB!', validateImageSize )
});

interface ValidationSchema {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  image?: File;
}

const signupPageStyle: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
  background: 'linear-gradient(to left bottom,rgba(70,87,235,.692),rgba(255,255,255,.767),rgba(238,54,140,.603))'
};

const signupBoxStyle: SxProps<Theme> = {
  m: 'auto',
  p: 2,
  maxWidth: 746,
  height: 746,
  background: 'url(https://angular-dummy-project.herokuapp.com/signup-bg.4f6dabe2759f68d73ecc.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%'
};

const formContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  height: 1,
  justifyContent: 'space-between'
};

const imgPreviewContainerStyle: SxProps<Theme> = {
  m: 'auto',
  display: 'flex',
  flexDirection: 'column'
};

const imgPreviewStyle: SxProps<Theme> = {
  width: 'auto',
  maxWidth: 350,
  height: 'auto',
  maxHeight: 150,
  m: 1,
  borderRadius: 2,
  boxShadow: '0 0 10px black'
};

interface SignupPageProps extends RouteComponentProps {}

export default function SignupPage( props: SignupPageProps ) {
  const [ imgPreviewDataURL, setImgPreviewDataURL ] = useState<string>();
  const [ showPassword, setShowPassword ]           = useState( false );
  const profileImageRef = useRef<HTMLInputElement>( null );

  const inputs = useMemo(() => ([
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      props: {
        startAdornment: (
          <InputAdornment position = "start">
            <LabelIcon />
          </InputAdornment>
        )
      }
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      props: {
        startAdornment: (
          <InputAdornment position = "start">
            <LabelIcon />
          </InputAdornment>
        )
      }
    },
    {
      type: 'text',
      name: 'username',
      label: 'User Name',
      props: {
        startAdornment: (
          <InputAdornment position = "start">
            <AccountBoxOutlined />
          </InputAdornment>
        )
      }
    },
    {
      type: 'text',
      name: 'email',
      label: 'E-Mail',
      props: {
        startAdornment: (
          <InputAdornment position = "start">
            <Email />
          </InputAdornment>
        )
      }
    },
    {
      type: showPassword ? 'text' : 'password',
      name: 'password',
      label: 'Password',
      props: {
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
      }
    },
    {
      type: showPassword ? 'text' : 'password',
      name: 'confirmPassword',
      label: 'Confirm Password',
      props: {
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
      }
    }
  ]), [ showPassword ]);

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

  const handleSignupRequest = ( signupData: ValidationSchema ) => {
    console.log( signupData );
  };

  const handlePreviewImage = ( e: ChangeEvent ) => {
    // @ts-ignore
    const file = (e.target as HTMLInputElement)?.files[0];
    if ( !file ) {
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImgPreviewDataURL( fileReader.result as string || '' );
      setValue( 'image', file, { shouldValidate: true });
    };
    
    fileReader.readAsDataURL( file );
  };

  return (
    <Box sx = { signupPageStyle }>
      <Box sx = { signupBoxStyle }>
        <Box
          sx        = { formContainerStyle }
          component = "form"
          onSubmit  = { handleSubmit( handleSignupRequest ) }>
          <Box>
            {
              inputs.map( input => (
                <TextField
                  // @ts-ignore
                  { ...register( input.name ) }
                  type       = { input.type }
                  key        = { input.name }
                  label      = { input.label }
                  InputProps = { input.props }
                  // @ts-ignore
                  error      = { touchedFields[ input.name ] && Boolean( errors[ input.name ]) }
                  // @ts-ignore
                  helperText = { touchedFields[ input.name ] && errors[ input.name ]?.message }
                  margin     = "dense"
                  variant    = "filled"
                  fullWidth
                />
              ))
            }
          </Box>

          {/* Profile Img Preview */}
          <Box sx = {{ display: 'flex', p: 2 }}>
            <Box
              component = "input"
              { ...register( 'image' ) }
              type     = "file"
              accept   = { ALLOWED_MIME_TYPE.toString() }
              ref      = { profileImageRef }
              hidden   = { true }
              onChange = { handlePreviewImage }
            />
            <Box sx = { imgPreviewContainerStyle }>
              <Tooltip title = "Optional">
                <Button
                  sx = {{ m: 1 }}
                  variant   = "outlined"
                  startIcon = { <ImageIcon /> }
                  onClick   = { () => profileImageRef.current?.click() }>
                  Pick a Profile Image
                </Button>
              </Tooltip>
              {
                errors.image &&
                <Grow in = { true }>
                  <Alert severity = "error">{ errors.image?.message }</Alert>
                </Grow>
              }
              {
                imgPreviewDataURL &&
                <Grow in = { Boolean( imgPreviewDataURL ) }>
                  <Box
                    component = "img"
                    src = { imgPreviewDataURL }
                    alt = "Profile Image Preview"
                    sx  = { imgPreviewStyle }
                  />
                </Grow>
              }
            </Box>
          </Box>

          {/* Form Actions / Submit Button */}
          <Box sx = {{ marginTop: 2 }}>
            <Button
              type     = "submit"
              disabled = { !isValid }
              endIcon  = { <Verified /> }
              variant  = "contained"
              color    = "primary"
              fullWidth>
                Sign-Up
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
