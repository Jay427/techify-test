import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    dashboardDetails,
} from '../../actions/index';
import moment from 'moment-timezone';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDashboardData: [],
            role: '',
        };
        this.getPageData = this.getPageData.bind(this);
        this.renderData = this.renderData.bind(this);
    }

    async componentWillMount() {
        await this.getPageData({});
    }

    async getPageData() {

        try {
            const data = await this.props.dashboardDetails();
            console.log('log :: getPageData :: data ::', data);
            this.setState({
                userDashboardData: data.userDashboardData,
                role: data.role,
            });
        } catch (e) {
            console.log("log :: getPageData :: error ::", e);
            this.props.history.push('./login');
            //alert(e.response.data.message);
        }

    }

    renderData() {
        const {
            userDashboardData,
            role,
        } = this.state;
        if (role === 'editor') {
            return <div>
                <div class="card-body">
                    <h5 class="card-title">Role : {userDashboardData[0]['role'].toUpperCase()}</h5>
                    <p class="card-text">Email : {userDashboardData[0]['email']}</p>
                    <p class="card-text">{moment(userDashboardData[0]['createdOn']).format('LLLL')}</p>
                </div>
            </div>
        } else {
            return <div style={{"width": "auto"}}>
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Role</th>
                    <th scope="col">Email</th>
                    <th scope="col">Created On</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userDashboardData.map((item, i)=>{
                            return  <tr>
                            <th scope="row">{i+1}</th>
                            <td>{item.role.toUpperCase()}</td>
                            <td>{item.email}</td>
                            <td>{moment(item.createdOn).format('LLLL')}</td>
                          </tr>
                        })
                    }
                </tbody>
                </table>
            </div>
        }
    }

    render() {

        return (
            <div>
                {this.renderData()}
            </div>
        );
    }
}

function mapStateToProps({ currentPageData }) {
    return { currentPageData };
};

const mapDispatchToProps = {
    dashboardDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);