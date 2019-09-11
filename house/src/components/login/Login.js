import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./login.css";

export default class Register extends Component {
  state = {
    email: "",
    password: "",
    success: false,
    errorMessage: false
  };

  register = (email, password) => {
    axios
      .post("http://localhost:3000/api/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        console.log(res.data);
        if (res.data.loginSuccess) {
          this.props.history.push("/dashboard");
        } else {
          this.setState({
            errorMessage: true
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          errorMessage: true
        });
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    this.register(this.state);
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="signin_container">
        <div className="signin_wrapper">
          <h3>Login !</h3>

          <Row>
            <div style={{ color: "red" }}>
              {this.state.errorMessage === true
                ? "Login Unsuccessful, email or password incorrect"
                : ""}
            </div>
          </Row>

          <Row>
            <Col>
              <form onSubmit={this.handleSubmit}>
                <Row>
                    <label htmlFor="">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      value={email}
                      id="email"
                      name="email"
                      onChange={this.handleChange}
                      required
                      placeholder="Enter Email Address"
                    />
                </Row>

                <Row>
                    <label htmlFor="">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      value={password}
                      id="password"
                      name="password"
                      onChange={this.handleChange}
                      required
                      placeholder="Enter Password"
                    />
                </Row>

                <button
                  type="submit"
                  className="btn btn-secondary"
                  style={{  }}
                >
                  Login
                </button>

                <div style={{ color: "red" }}>
                  {this.state.errorMessage === true
                    ? "Login Unsuccessful, email or password incorrect"
                    : ""}
                </div>
              </form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
