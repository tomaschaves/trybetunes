import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    isEnterButtonDisabled: true,
    username: '',
    loading: false,
  };

  handleLength = () => {
    const { username } = this.state;
    const minimum = 3;
    if (username.length >= minimum) {
      this.setState({
        isEnterButtonDisabled: false,
      });
    }
  };

  handleChange = ({ target }) => {
    const { value } = target;

    this.setState(
      { username: value },
      () => {
        this.handleLength();
      },
    );
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { username } = this.state;
    const { history } = this.props;

    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: username });
      history.push('/search');
    });
  };

  render() {
    const { isEnterButtonDisabled, loading } = this.state;

    if (loading) return <h3>Carregando...</h3>;

    return (
      <div data-testid="page-login">
        <form onSubmit={ this.onSaveButtonClick }>
          <input
            type="text"
            name="user"
            id="user"
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isEnterButtonDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
