import React, { FC } from 'react';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/img/logo.svg';
import poland from '../../assets/img/poland.png';
import england from '../../assets/img/england.png';
import userLogo from '../../assets/img/userLogo.png';
import { useCurrentUser } from '../../contexts/UserContext';
import useRole from '../../hooks/useRole';
import ProfilePlaceholder from '../../assets/img/person-circle.svg';
import { Roles } from '../../enums/Roles';

const NavigationBar: FC = () => {
  const { t, i18n } = useTranslation();
  const hasRole = useRole();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language).catch();
    window.location.reload();
  };
  const { currentUser, onLogOut, userPhoto } = useCurrentUser();
  const { firstName, lastName } = currentUser!;
  const userNavbarAvatar = userPhoto !== ProfilePlaceholder ? userPhoto : userLogo;

  const activeLanguage = (active: boolean) => (active ? 'fw-bold' : '');

  return (
    <Navbar expand="md" className="navbar-default" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="ml-3">
          <img src={logo} alt="" />
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="ms-auto">
            {!hasRole(Roles.Customer) ? (
              <Nav.Link as={Link} to="/customers">
                {t('navbar.customer')}
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to={`/customers/${currentUser?.userId}/bikes`}>
                {t('navbar.myBikes')}
              </Nav.Link>
            )}

            <Nav.Link as={Link} to="/orders">
              {t('navbar.servicePanel')}
            </Nav.Link>

            <NavDropdown title={`${firstName} ${lastName}`} id="user-dropdown">
              <NavDropdown.Item as={Link} to="/orders">
                {t('userDropdown.servicePanel')}
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to={`/user/${currentUser?.userId}/settings`}>
                {t('userDropdown.settings')}
              </NavDropdown.Item>

              <NavDropdown.Item onClick={onLogOut}>
                <b>{t('userDropdown.logOut')}</b>
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown title={t('lang')} id="lang-dropdown">
                <NavDropdown.Item
                  onClick={() => changeLanguage('pl')}
                  className={`${activeLanguage(i18n.language === 'pl')}`}>
                  <img src={poland} className="lang-flag-img" alt="" /> PL
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => changeLanguage('en')}
                  className={`${activeLanguage(i18n.language === 'en')}`}>
                  <img src={england} className="lang-flag-img" alt="" /> EN
                </NavDropdown.Item>
              </NavDropdown>
            </NavDropdown>

            <div className="user-logo-wrapper">
              <Image
                src={userNavbarAvatar}
                className="user-logo user-logo-display-none"
                alt=""
                roundedCircle
              />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
