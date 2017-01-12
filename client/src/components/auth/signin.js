import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
    handleFormSubmit({ email, password }) {
        console.log(email, password);

        this.props.signinUser({ email, password });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Ooops! </strong>
                    {this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <div>
                        <Field 
                            name="email" 
                            component="input" 
                            type="text" 
                            placeholder="Email"
                            className="form-control"
                        />
                    </div>
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <div>
                        <Field 
                            name="password" 
                            component="input" 
                            type="password" 
                            placeholder="Password"
                            className="form-control"
                        />
                    </div>
                </fieldset>
                {this.renderAlert()}
                <button 
                    action="submit"
                    className="btn btn-primary"
                >
                    Sign in
                </button>
            </form>
        );
    }
}

const SigninForm = reduxForm({
    form: 'signin'
})(Signin);

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    }
}

export default connect(mapStateToProps, actions)(SigninForm);