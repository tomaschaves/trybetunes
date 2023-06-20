import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import './Profile.css';

class Profile extends Component {
  state = {
    user: '',
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({ user });
  };

  render() {
    const { user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile-section">
          {
            typeof user === 'string' && <p>Carregando...</p>
          }
          {
            typeof user === 'object' && (
              <div>
                <Link to="/profile/edit"> Editar perfil</Link>
                <h1>Profile</h1>

                <h2>
                  { user.name }
                </h2>
                <h3>
                  { user.email }
                </h3>
                <h3>
                  { user.description }
                </h3>
                <img
                  src={ user.image }
                  alt={ user.name }
                  data-testid="profile-image"
                  className="profile-image"
                />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default Profile;
