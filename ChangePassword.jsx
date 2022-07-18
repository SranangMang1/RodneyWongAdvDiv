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
import debug from "sabio-debug";
import { Formik, Field, ErrorMessage, Form } from "formik";
import swal from "sweetalert";
import usersServices from "../../services/usersServices";
import AdvDiversity from "../../assets/images/users/logo-transparent.png";
import { changePasswordSchema } from "../../schema/forgotPasswordSchema";

const _logger = debug.extend("changePassword");

function ChangePassword() {
  const urlContent = new URLSearchParams(window.location.search);
  const getToken = urlContent.get("token");
  const getEmail = urlContent.get("email");
  _logger(getEmail, "got the email");
  _logger(getToken, "we have a token");

  const [changePassword] = useState({
    formData: {
      token: getToken,
      email: getEmail,
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    _logger("handleSubmit", { values });
    usersServices
      .changePassword(values)
      .then(changePasswordSuccess)
      .catch(changePasswordError);
  };

  const changePasswordSuccess = () => {
    swal("Password Changed", "Use New Password to Log in", "success");
    navigate("/login");
    _logger("Password Changed Success");
  };

  const changePasswordError = (error) => {
    swal("Oh No!", "Please Check Password", "error");
    _logger(error);
  };

  return (
    <>
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
                      {"Change Password"}
                    </h4>
                  </div>
                  <Formik
                    enableReinitialize={true}
                    initialValues={changePassword.formData}
                    validationSchema={changePasswordSchema}
                    validateOnChange={true}
                    onSubmit={handleSubmit}
                  >
                    {({ values, errors, touched }) => (
                      <Form>
                        <FormGroup className="mb-3">
                          <FormLabel className="form-label">
                            New Password
                          </FormLabel>
                          <Field
                            name="password"
                            placeholder="Enter your New Password"
                            type="password"
                            className="form-control"
                            value={values.password}
                          />
                          {touched.password && errors.password && (
                            <div>{errors.password}</div>
                          )}
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="has-error"
                          >
                            You must enter a valid password
                          </ErrorMessage>
                        </FormGroup>

                        <FormGroup className="mb-3">
                          <FormLabel className="form-label">
                            Confirm New Password
                          </FormLabel>
                          <Field
                            name="confirmPassword"
                            placeholder="RE-Enter your New Password"
                            type="password"
                            className="form-control"
                            value={values.confirmPassword}
                          />
                          {touched.confirmPassword &&
                            errors.confirmPassword && (
                              <div>{errors.confirmPassword}</div>
                            )}
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="has-error"
                          >
                            You must enter a confirm password
                          </ErrorMessage>
                        </FormGroup>
                        <div className="form-group mb-3">
                          By clicking the <strong>Change Password</strong>{" "}
                          button below you will be changing your password.
                        </div>
                        <div className="mb-3 mb-0 text-center">
                          <Button className="btn-dark" size="md" type="submit">
                            Change Password
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Card>
              <Link to="/login" className="text-muted float-end">
                <p>{"Already Have an Account? Sign In"}</p>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
      <footer className="footer footer-alt">2022 © Advancing Diversity</footer>
    </>
  );
}
export default ChangePassword;
