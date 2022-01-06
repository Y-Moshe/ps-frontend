import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, SxProps, Theme, TextField, Button } from '@mui/material';

const validationSchema = yup.object({
  firstName: yup.string().required().min(3),
  lastName:  yup.string().required().min(3),
  email:     yup.string().required().email(),
  message:   yup.string().required().min(15)
});

interface ValidationSchema {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const contactPageStyle: SxProps<Theme> = {
  flexGrow: 1
};

const formContainerStyle: SxProps<Theme> = {
  margin: 'auto',
  maxWidth: 800,
  padding: 2
};

const actionsContainerStyle: SxProps<Theme> = {
  marginTop: 2,
  width: 1,
  display: 'flex',
  justifyContent: 'space-between'
};

export function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isValid,
      isDirty,
      touchedFields
    }
  } = useForm<ValidationSchema>({
    resolver: yupResolver( validationSchema ),
    mode: 'all'
  });

  const handleContact = ( contactData: ValidationSchema ) => {
    console.log( contactData );
  };

  return (
    <Box sx = { contactPageStyle }>
      <Box sx = {{ display: 'flex', bgcolor: 'info.main' }}>
        <img
          src = "https://angular-dummy-project.herokuapp.com/assets/images/contact-us.png"
          alt = "Contact page logo"
          style = {{ maxWidth: '100%', maxHeight: 450, margin: 'auto' }} />
      </Box>

      <Box
        component = "pre"
        sx = {{ textAlign: 'center' }}>
        Calista Merritt
        Ap #938-5470 Posuere Ave
        Chickasha LA 58520
        (693) 337-2849
      </Box>

      <Box
        sx = { formContainerStyle }
        component = "form"
        onSubmit  = { handleSubmit( handleContact ) }>
          <TextField
            { ...register( 'firstName' ) }
            label    = "First Name"
            error      = { touchedFields.firstName && Boolean( errors.firstName ) }
            helperText = { touchedFields.firstName && errors.firstName?.message }
            variant = "filled"
            margin  = "dense"
            fullWidth
          />
          <TextField
            { ...register( 'lastName' ) }
            label    = "Last Name"
            error      = { touchedFields.lastName && Boolean( errors.lastName ) }
            helperText = { touchedFields.lastName && errors.lastName?.message }
            variant = "filled"
            margin  = "dense"
            fullWidth
          />
          <TextField
            { ...register( 'email' ) }
            label    = "E-Mail Address"
            error      = { touchedFields.email && Boolean( errors.email ) }
            helperText = { touchedFields.email && errors.email?.message }
            variant = "filled"
            margin  = "dense"
            fullWidth
          />
          <TextField
            { ...register( 'message' ) }
            label    = "Message"
            error      = { touchedFields.message && Boolean( errors.message ) }
            helperText = { touchedFields.message && errors.message?.message }
            margin = "normal"
            multiline
            fullWidth
          />
          <Box sx = { actionsContainerStyle }>
            <Button
              onClick  = { () => reset() }
              disabled = { !isDirty }
              color    = "inherit"
              sx = {{ width: 200 }}>
                Clear
            </Button>
            <Button
              type     = "submit"
              disabled = { !isValid }
              variant  = "contained"
              color    = "success"
              sx = {{ width: 200 }}>
                Contact
            </Button>
          </Box>
      </Box>
    </Box>
  )
}
