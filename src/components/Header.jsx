import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Header.css';

class Header extends Component {
  state = {
    userName: '',
    loading: false,
    userImage: '',
  };

  componentDidMount() {
    this.fetchName();
    this.fetchImage();
  }

  fetchName = async () => {
    const load = true;

    this.setState({ loading: load });
    const stateName = await getUser();
    this.setState({
      loading: !load,
      userName: stateName.name,
    });
  };

  fetchImage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.image.length > 0) {
      this.setState({
        userImage: user.image,
      });
    }
    console.log(user);
  };

  render() {
    const { userName, loading, userImage } = this.state;
    if (loading) return <h3>Carregando...</h3>;

    return (
      <header data-testid="header-component">
        <ul className="links">
          <Link to="/search" data-testid="link-to-search" className="text-link">
            <li>
              Buscar
            </li>
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites" className="text-link">
            <li>
              Favoritos
            </li>
          </Link>
          <Link to="/profile" data-testid="link-to-profile" className="text-link">
            <li>
              Perfil
            </li>
          </Link>
        </ul>
        <h3 data-testid="header-user-name">
          { userName }
          {
            userImage.length > 0 && (
              <img src={ userImage } alt={ userName } className="profileImage" />
            )
          }
        </h3>
      </header>
    );
  }
}

export default Header;
