import React from 'react';
import {Link, Route, Switch, Redirect} from 'react-router-dom';
import App from './App';
import {logout} from './Auth.redux';
import {connect} from 'react-redux';

function Test1(){
    return <h2>test1</h2>
}

function Test2(){
    return <h2>test2</h2>
}

class Test extends React.Component {
    render(){
        return <h2>test component, location: {this.props.match.params.location}</h2>
    }
}

@connect(
   state=>state.auth,
   {logout}
)
class Dashboard extends React.Component{
    render(){
        const match = this.props.match;
        const redirectToLogin = (<Redirect to='/login'></Redirect>);
        const app = (
            <div>
                <button onClick={this.props.logout}>log out</button>
                <ul>
                    <li><Link to={`${match.url}`}>root</Link></li>
                    <li><Link to={`${match.url}/test1`}>test1</Link></li>
                    <li><Link to={`${match.url}/test2`}>test2</Link></li>
                    <li><Link to={`${match.url}/test3`}>test3</Link></li>
                </ul>
                <Switch>
                    <Route path={`${match.url}`} exact component={App}></Route>
                    <Route path={`${match.url}/test1`} exact component={Test1}></Route>
                    <Route path={`${match.url}/test2`} exact component={Test2}></Route>
                    <Route path={`${match.url}/:location`} component={Test}></Route>
                </Switch>
            </div>
        );
        return this.props.isAuth ? app : redirectToLogin;
    }
}
export default Dashboard;