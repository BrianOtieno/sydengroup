import React, { useState, useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next'; 
import { UserContext } from '../contexts/UserContext';
import axios from '../api/axios';

const ME_URL = '/users/me'
 
const Sidebar = (props) => { 
  const [state, setState] = useState({});
  const [ token, ] = useContext(UserContext);
  const [data, setData] = useState([])

  useEffect(() => {
    const _requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization : "Bearer " + token,
      },
      withCredentials: true,
      crossDomain: true
    } 

    const fetchData = async () =>{ 
      try {
        const {data: response} = await axios.get(ME_URL, _requestOptions); 
        setData(response);
      } catch (error) {
        console.error(error.message);
      } 
    }

    fetchData();
  }, [])

  const toggleMenuState = (menuState) => {
    if (state[menuState]) {
      setState({[menuState] : false});
    } else if(Object.keys(state).length === 0) {
      setState({[menuState] : true});
    } else {
      Object.keys(state).forEach(i => {
        setState({[i]: false});
      });
      setState({[menuState] : true}); 
    }
  }

  const isPathActive = (path) => {
    return props.location.pathname.startsWith(path);
  }

  const componentDidUpdate = (prevProps) => {
    if (props.location !== prevProps.location) {
      onRouteChanged();
    }
  }

  const componentDidMount = () => {
    onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

  const onRouteChanged = () => {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(state).forEach(i => {
      setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/compliance', state: 'complianceMenuOpen'},
      {path:'/infosec', state: 'complianceMenuOpen'},
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (isPathActive(obj.path)) {
        setState({[obj.state] : true})
      }
    }));
 
  }

  // render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          {/* <a className="sidebar-brand brand-logo" href="index.html"><img src={require('../assets/images/SydenGroup.svg')} alt="logo" /></a>
          <a className="sidebar-brand brand-logo-mini" href="index.html"><img src={require('../assets/images/SydenGroup-mini.svg')} alt="logo" /></a> */}
          <a className="sidebar-brand brand-logo" href="index.html" style={{ textDecoration: "none" }}>SydenGroup</a>
          <a className="sidebar-brand brand-logo-mini" href="index.html" style={{ textDecoration: "none" }}>S</a>
        </div>
        <ul className="nav">
          <li className="nav-item profile">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img className="img-xs rounded-circle " src={require('../assets/images/dps/obrienotieno.jpeg')} alt="profile" />
                  <span className="count bg-success"></span>
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal"><Trans>{data.first_name} {data.last_name}</Trans></h5>
                  <span><Trans>Gold Member</Trans></span>
                </div>
              </div>
              <Dropdown alignRight>
                <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                  <i className="mdi mdi-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="sidebar-dropdown preview-list">
                  <a href="!#" className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-primary"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>Account settings</Trans></p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="!#" className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-onepassword  text-info"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>Change Password</Trans></p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="!#" className="dropdown-item preview-item" onClick={evt =>evt.preventDefault()}>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-calendar-today text-success"></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1 text-small"><Trans>To-do list</Trans></p>
                    </div>
                  </a>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>Navigation</Trans></span>
          </li>
          <li className={ isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </Link>
          </li>
          <li className={ isPathActive('/compliance') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ state.complianceMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('complianceMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title"><Trans>Regulatory</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ state.complianceMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/compliance/new-compliance') ? 'nav-link active' : 'nav-link' } to="/compliance/new-compliance"><Trans>New Compliance</Trans></Link></li>
                </ul>

                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/infosec') ? 'nav-link active' : 'nav-link' } to="/infosec"><Trans>Infosec</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ isPathActive('/basic-ui') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('basicUiMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-laptop"></i>
              </span>
              <span className="menu-title"><Trans>Basic UI Elements</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ state.basicUiMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link' } to="/basic-ui/buttons"><Trans>Buttons</Trans></Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link' } to="/basic-ui/dropdowns"><Trans>Dropdowns</Trans></Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link' } to="/basic-ui/typography"><Trans>Typography</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ isPathActive('/form-elements') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ state.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('formElementsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-playlist-play"></i>
              </span>
              <span className="menu-title"><Trans>Form Elements</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ state.formElementsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link' } to="/form-elements/basic-elements"><Trans>Basic Elements</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ isPathActive('/tables') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ state.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('tablesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-table-large"></i>
              </span>
              <span className="menu-title"><Trans>Tables</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ state.tablesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/tables/basic-table') ? 'nav-link active' : 'nav-link' } to="/tables/basic-table"><Trans>Basic Table</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ isPathActive('/charts') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ state.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('chartsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-chart-bar"></i>
              </span>
              <span className="menu-title"><Trans>Charts</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ state.chartsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/charts/chart-js') ? 'nav-link active' : 'nav-link' } to="/charts/chart-js"><Trans>Chart Js</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ isPathActive('/icons') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('iconsMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-contacts"></i>
              </span>
              <span className="menu-title"><Trans>Icons</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ state.iconsMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link' } to="/icons/mdi"><Trans>Material</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={ isPathActive('/user-pages') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('userPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-security"></i>
              </span>
              <span className="menu-title"><Trans>User Pages</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ state.userPagesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/login') ? 'nav-link active' : 'nav-link' } to="/login"><Trans>Login</Trans></Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/register') ? 'nav-link active' : 'nav-link' } to="/register"><Trans>Register</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>More</Trans></span>
          </li>
          <li className={ isPathActive('/errors') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ state.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => toggleMenuState('errorPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi-lock"></i>
              </span>
              <span className="menu-title"><Trans>Error Pages</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ state.errorPagesMenuOpen }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ isPathActive('/error/error-404') ? 'nav-link active' : 'nav-link' } to="/error/error-404">404</Link></li>
                  <li className="nav-item"> <Link className={ isPathActive('/error/error-500') ? 'nav-link active' : 'nav-link' } to="/error/error-500">500</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className="nav-item menu-items">
            <a className="nav-link" href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <span className="menu-icon">
                <i className="mdi mdi-file-document-box"></i>
              </span>
              <span className="menu-title"><Trans>Documentation</Trans></span>
            </a>
          </li>
        </ul>
      </nav>
    );
  // }





}

export default withRouter(Sidebar);