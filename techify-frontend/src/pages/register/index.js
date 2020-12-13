import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    register,
} from '../../actions/index';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role: 'admin',
        };
        this.onRegister = this.onRegister.bind(this);
    }

    async onRegister(e) {

        e.preventDefault();

        const {
            email,
            password,
            role,
        } = this.state;

        try {

            const payload = {
                email,
                password,
                role,
            };

            await this.props.register(payload);

            this.props.history.push('/login');

        } catch (e) {

            alert(e.response.data.message);

        }

    }

    render() {

        return (
            <div>
                <form>
                    <h3>Register</h3>

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

                    <div className="form-group">
                        <label>Select Role</label>
                        <select class="form-control" value={this.state.role} onChange={(e) => { this.setState({ role: e.target.value }) }} >
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={e => this.onRegister(e)}>Register</button>
                    <p className="forgot-password text-right">
                        Already registered <a href="/login">log in?</a>
                    </p>
                </form>
            </div>
        );
    }
}

function mapStateToProps({ currentPageData }) {
    return { currentPageData };
};

const mapDispatchToProps = {
    register,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);