import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    editModeOn: false,
    user: {},
    submitButton: true,
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({
      editModeOn: true,
    });
    const user = await getUser();
    this.setState({
      editModeOn: false,
      user,
    });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    const { user } = this.state;
    this.setState({
      user: { ...user, [name]: value },
    }, () => this.validateSubmit());
  };

  validateSubmit = () => {
    const { user: { name, email, description, image } } = this.state;
    const regexEmail = /\S+@\S+\.\S+/;
    const regexTest = regexEmail.test(email);
    const allFields = [name, email, description, image];
    const length = allFields.every((field) => field.length > 0);
    if (length && regexTest) {
      this.setState({
        submitButton: false,
      });
    } else {
      this.setState({
        submitButton: true,
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { user } = this.state;
    await updateUser(user);
    history.push('/profile');
  };

  render() {
    const { editModeOn, user, submitButton } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        ProfileEdit
        {
          editModeOn && <p>Carregando...</p>
        }
        {
          !editModeOn && (
            <form onSubmit={ this.handleSubmit }>
              <input
                type="text"
                data-testid="edit-input-name"
                value={ user.name }
                name="name"
                onChange={ this.handleChange }
              />
              <input
                type="text"
                data-testid="edit-input-email"
                value={ user.email }
                name="email"
                onChange={ this.handleChange }
              />
              <input
                type="text"
                data-testid="edit-input-description"
                value={ user.description }
                name="description"
                onChange={ this.handleChange }
              />
              <input
                type="text"
                data-testid="edit-input-image"
                name="image"
                value={ user.image }
                onChange={ this.handleChange }
              />
              <button
                type="submit"
                disabled={ submitButton }
                data-testid="edit-button-save"
              >
                Alterar

              </button>
            </form>
          )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
