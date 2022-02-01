import React from 'react';

const LoginPage  = React.lazy( () => import( './Login/LoginPage' ));
const SignupPage = React.lazy( () => import( './Signup/SignupPage' ));
const VerifyEmailPage     = React.lazy( () => import( './VerifyEmail/VerifyEmailPage' ));
const RecoverPasswordPage = React.lazy( () => import( './RecoverPassword/RecoverPasswordPage' ));

export {
  LoginPage,
  SignupPage,
  VerifyEmailPage,
  RecoverPasswordPage
};
