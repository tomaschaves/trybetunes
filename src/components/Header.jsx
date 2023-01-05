import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    userName: '',
    loading: false,
  };

  componentDidMount() {
    this.fetchName();
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

  render() {
    const { userName, loading } = this.state;
    if (loading) return <h3>Carregando...</h3>;

    return (
      <header data-testid="header-component">
        <ul>
          <li>
            <Link to="/search" data-testid="link-to-search">
              Buscar
            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              Favoritos
            </Link>
            <Link to="/profile" data-testid="link-to-profile">
              Perfil
            </Link>
          </li>
        </ul>
        <h3 data-testid="header-user-name">
          { userName }
        </h3>
      </header>
    );
  }
}

export default Header;
