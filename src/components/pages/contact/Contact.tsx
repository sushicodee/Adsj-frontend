import React from "react";
import { Formik } from "formik";
import "./Contact.scss";
import { Button } from "@material-ui/core";
import CustomTextField from "../../common/textField/CustomTextField";
import * as Yup from "yup";
interface IFormState {
  email: string;
  subject: string;
  message: string;
}
const Contact: React.FC = () => {
  const initialState: IFormState = { email: "", subject: "", message: "" };
  const contactSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Please Enter your email"),
    subject: Yup.string(),
    message: Yup.string()
      .min(10, "Message should be at least 10 characters long")
      .required("Please write a Message"),
  });

  return (
    <Formik
      initialValues={initialState}
      validationSchema={contactSchema}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        console.log(data);
        setSubmitting(false);
      }}
    >
      {({
        values,
        isSubmitting,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit} className="contact-form">
          <CustomTextField name="email" label="email" placeholder="email" />
          <CustomTextField
            name="subject"
            label="subject"
            placeholder="subject"
          />
          <CustomTextField
            rows={4}
            multiline={true}
            name="message"
            label="message"
            placeholder="message"
          />
          <Button disabled={isSubmitting} type="submit" />
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </form>
      )}
    </Formik>
  );
};

export default Contact;
