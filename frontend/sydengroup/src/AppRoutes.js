import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; 
import Spinner from './shared/Spinner';

const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));

const Buttons = lazy(() => import('./components/basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./components/basic-ui/Dropdowns'));
const Typography = lazy(() => import('./components/basic-ui/Typography'));

const BasicElements = lazy(() => import('./components/form-elements/BasicElements'));

const BasicTable = lazy(() => import('./components/tables/BasicTable'));

const Mdi = lazy(() => import('./components/icons/Mdi'));

const ChartJs = lazy(() => import('./components/charts/ChartJs'));

const Error404 = lazy(() => import('./components/errors/Error404'));
const Error500 = lazy(() => import('./components/errors/Error500')); 

const Login = lazy(() => import('./components/user/Login'));
const Register = lazy(() => import('./components/user/Register'));
const Infosec = lazy(() => import('./components/infosec/Infosec'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/dashboard" component={ Dashboard } /> 
          
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/infosec" component={ Infosec } />

          <Route path="/error/error-404" component={ Error404 } />
          <Route path="/error/error-500" component={ Error500 } /> 

          <Route path="/basic-ui/buttons" component={ Buttons } />
          <Route path="/basic-ui/dropdowns" component={ Dropdowns } />
          <Route path="/basic-ui/typography" component={ Typography } />

          <Route path="/form-Elements/basic-elements" component={ BasicElements } />

          <Route path="/tables/basic-table" component={ BasicTable } />

          <Route path="/icons/mdi" component={ Mdi } />

          <Route path="/charts/chart-js" component={ ChartJs } />


          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;