import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopNavigation from '../component/TopNavigation';
import { Col, Row } from "antd";

class PublicRoute extends Component {
    render() {
        const { component: Component, ...rest } = this.props;

        return (
            <Route
                {...rest}
                component={props =>
                    (
                        <div>
                            <TopNavigation {...props} />
                            <Row style={{ marginTop: 16 }} >
                                <Col span={6} offset={1}>
                                    <Component {...props} />
                                </Col>
                            </Row>
                        </div>
                    )
                }
            />
        );
    }
}

PublicRoute.propTypes = {
    component: PropTypes.object.isRequired,
};

export default PublicRoute;
