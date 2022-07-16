import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Row,
  Container,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";
import AdvDiversity from "../../assets/images/users/logo-transparent.png";
import { forgotPasswordSchema } from "../../schema/forgotPasswordSchema";
import usersServices from "../../services/usersServices";
import swal from "sweetalert";

function ForgotPassword() {
  const [forgotPassword] = useState({
    formData: { email: "" },
  });

  const navigate = useNavigate();

  const handleSubmit = (value) => {
    usersServices
      .forgotPassword(value)
      .then(forgotPasswordSuccess)
      .catch(forgotPasswordError);
  };

  const forgotPasswordSuccess = () => {
    swal("Thank You", "Email was send to reset password", "success");
    navigate("/login");
  };

  const forgotPasswordError = () => {
    swal("Check Info Entered", "Please Enter Valid Email", "error");
  };

  return (
    <React.Fragment>
      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5} xxl={4}>
              <Card>
                <Card.Header className="pt-1 pb-0 text-center bg-dark">
                  <Link to="/">
                    <span>
                      <img
                        src={AdvDiversity}
                        alt="Advancing Diversity"
                        height="150"
                      />
                    </span>
                  </Link>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">
                      {"Reset password"}
                    </h4>
                    <p className="text-muted mb-4">
                      {"Enter your email address to Reset Password."}
                    </p>
                  </div>
                  <Formik
                    enableReinitialize={true}
                    initialValues={forgotPassword.formData}
                    validationSchema={forgotPasswordSchema}
                    validateOnChange={true}
                    onSubmit={handleSubmit}
                  >
                    {({ values, errors, touched }) => (
                      <Form>
                        <FormGroup className="mb-3">
                          <FormLabel className="form-label">
                            Email Address
                          </FormLabel>

                          <Field
                            label="email"
                            name="email"
                            placeholder="Enter your email"
                            type=" email"
                            className="form-control"
                            id="email"
                            value={values.email}
                          />
                          {touched.email && errors.email && (
                            <div>{errors.email}</div>
                          )}
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="has-error"
                          >
                            You must enter a valid email
                          </ErrorMessage>
                        </FormGroup>

                        <FormGroup className="mb-3 mb-0 text-center">
                          <Button className="btn-dark" size="md" type="submit">
                            Submit
                          </Button>
                        </FormGroup>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default ForgotPassword;
