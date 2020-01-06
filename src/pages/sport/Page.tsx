import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Outline from '../../components/Outline'

export default class Page extends Component {
    render() {
        return (
            <React.Fragment>
                <Row type='flex' justify='center'>

                    {/* outliner */}
                    <Col>
                        <Outline text='เลือกประเภทกีฬา' />
                    </Col>


                </Row>
            </React.Fragment>
        )
    }
}
