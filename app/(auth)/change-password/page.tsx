import AuthFormPage from "@/components/AuthForm";
import AuthForm from "@/components/AuthForm";
import React, { Suspense } from "react";
// 1. Nagivate to reset password page when Click on fotgot password link
// 2. Using resned to send a email to registed email address
// 3. If email is not yet registered => call error
// 4. Send email success and have a link
// 5. Open email and reset password
const ResetPasswordPage = () => {
  return <AuthFormPage title="Change Password" description="Please enter your new password to change password." type="change-password" />;
};

export default ResetPasswordPage;
