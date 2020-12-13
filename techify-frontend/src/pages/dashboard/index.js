import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {

        return (
            <div>
                Dashboard
            </div>
        );
    }
}

function mapStateToProps({ currentPageData }) {
    return { currentPageData };
};

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);