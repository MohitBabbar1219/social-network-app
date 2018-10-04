import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './containers/Login';
import Register from './containers/Register';
import CreateProfile from './containers/CreateProfile';
import EditProfile from './containers/EditProfile';
import AddExperience from './containers/AddExperience';
import AddEducation from './containers/AddEducation';
import Landing from './components/Landing';
import Dashboard from "./containers/Dashboard";
import Profiles from "./containers/Profiles";
import Posts from "./containers/Posts";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser} from "./actions/loginAction";
import PrivateRoute from "./hoc/PrivateRoute";


class App extends Component {

    componentDidMount() {
        console.log('auth token set');
        setAuthToken(localStorage.getItem('authToken'));
        this.props.setCurrentUser();
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar/>
                    <Route path="/" exact component={Landing} />
                    <div className="container">
                        <Route path="/login" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                        <Switch>
                            <PrivateRoute path='/dashboard' exact component={Dashboard}/>
                            <PrivateRoute path='/create_profile' exact component={CreateProfile}/>
                            <PrivateRoute path='/edit_profile' exact component={EditProfile}/>
                            <PrivateRoute path='/add_experience' exact component={AddExperience}/>
                            <PrivateRoute path='/add_education' exact component={AddEducation}/>
                            <PrivateRoute path='/profiles' exact component={Profiles}/>
                            <PrivateRoute path='/feed' exact component={Posts}/>
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setCurrentUser
}, dispatch);

export default connect(null, mapDispatchToProps)(App);
