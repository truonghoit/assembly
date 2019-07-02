import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import ExampleCard from './components/ExampleCard';

class ExamplePage extends Component {
    render() {
        return (
            <Container className="dashboard">
                <Row>
                    <Col md={12}>
                        <h3 className="page-title">Example 1</h3>
                    </Col>
                </Row>
                <Row>
                    <ExampleCard/>
                </Row>
            </Container>
        );
    }
}

export default ExamplePage;
