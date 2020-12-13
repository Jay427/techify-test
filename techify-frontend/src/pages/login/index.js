import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    login,
} from '../../actions/index';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.onLogin = this.onLogin.bind(this);
    }

    async onLogin(e) {

        e.preventDefault();

        const {
            email,
            password,
        } = this.state;

        try {

            const payload = {
                email,
                password,
            };

            await this.props.login(payload);

            this.props.history.push('/dashboard');

        } catch (e) {

            alert(e.response.data.message);

        }

    }

    render() {

        return (
            <div>
                <form>
                    <h3>Log in</h3>

                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter email" 
                            required
                            value={this.state.email}
                            onChange={(e) => { this.setState({ email: e.target.value }) }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Enter password" 
                            required 
                            value={this.state.password}
                            onChange={(e) => { this.setState({ password: e.target.value }) }}
                        />
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={e => this.onLogin(e)}>Sign in</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps({ currentPageData }) {
    return { currentPageData };
};

const mapDispatchToProps = {
    login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);