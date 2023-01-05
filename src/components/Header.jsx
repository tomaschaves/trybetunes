import React, { Component } from 'react';
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
        <h3 data-testid="header-user-name">
          { userName }
        </h3>
      </header>
    );
  }
}

export default Header;
