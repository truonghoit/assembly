import React, {Component} from 'react';
import { Col, Container, Row } from 'reactstrap';
import ExampleCard from './components/ExampleCard';
import callAxios from '../../services/api';

class ExamplePage extends Component {
    componentDidMount(){
        //setInterval(this.callAxios(), 1000);
        let method = 'POST';
        let url = '/api/asc/article';
        let param = {
            "dropdownlist-name" : "parent"
        };

        /*let intervalRequest = setInterval(() => callAxios(method, url, param), 1000);
        setTimeout(()=> {
            clearInterval(intervalRequest);
        }, 10000);*/
	    callAxios(method, url, param).then(response => {
            console.log("response:", response);
        });

    }

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
