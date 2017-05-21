import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {

  renderField(field) {
    const { meta: { touched, error } } = field;
    return (
      <fieldset className='form-group'>
        <label>{field.label}</label>
        <input className='form-control' type={field.type} {...field.input} />
        {touched && error && <div className='error'>{error}</div>}
      </fieldset>
    );
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  handleFormSubmit({ email, password }) {
    this.props.signupUser({ email, password }, () => this.props.history.push('/feature'));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          label='Email:'
          name='email'
          type='text'
          component={this.renderField} />
        <Field
          label='Password:'
          name='password'
          type='password'
          component={this.renderField} />
        {}
        <Field
          label='Confirm password:'
          name='password_confirm'
          type='password'
          component={this.renderField} />
        {this.renderAlert()}
        <button action='submit' className='btn btn-primary'>Sign up</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter an email';
  }
  if (!values.password) {
    errors.password = 'Please enter a password';
  }
  if (!values.password_confirm) {
    errors.password_confirm = 'Please enter a password confirmation';
  }
  if (values.password !== values.password_confirm) {
    errors.password = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: 'signup'
})(
  connect(mapStateToProps, actions)(Signup)
  );