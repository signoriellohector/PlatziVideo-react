import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import gravatar from '../utils/gravatar';
import { logoutRequest } from '../actions';

// styles
import '../assets/styles/components/Header.scss';

// Images
import logo from '../assets/static/logo-platzi-video-BW2.png';
import userIcon from '../assets/static/user-icon.png';

const Header = (props) => {
  const { user } = props;

  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    props.logoutRequest({});
  };

  return (
    <header className='header'>
      {/* Go back to Home */}
      <Link to='/'>
        <img className='header__img' src={logo} alt='Platzi Video' />
      </Link>

      <div className='header__menu'>
        <div className='header__menu--profile'>

          {/* validando login para gravatar */}
          {hasUser ? (
            <img src={gravatar(user.email)} alt={user.email} />
          ) : (
            <img src={userIcon} alt='' />
          )}

          <p>Perfil</p>
        </div>
        <ul>

          {/* validando login */}
          {hasUser ? (
            <li><Link to='/'>{user.name}</Link></li>
          ) : (
            null
          )}

          {/* validando logout */}
          {hasUser ? (
            <li>
              <a href='#logout' onClick={handleLogout}>Cerrar Sesíon</a>
            </li>
          ) : (
            <li>
              <Link to='/login'>
              Iniciar Sesión
              </Link>
            </li>
          )}

        </ul>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: propTypes.object.isRequired,
  logoutRequest: propTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
