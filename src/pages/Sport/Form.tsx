import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Form, Col, Row } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import Outline from '../../components/Outline'


class FormPage extends Component<
    RouteComponentProps<any> & FormComponentProps,
    {}
    > {
    render() {
        return (
            <React.Fragment>
                {/* outliner n' desc */}
                <Col style={{ marginTop: '-10px' }} span={24}>
                    <Row type='flex' justify='start'>
                        {/* outliner */}
                        <Outline>
                            กรอกรหัสนักศึกษา
                         </Outline>

                        {/* description */}
                        <Col
                            style={{
                                marginTop: '-20px',
                                color: '#666666',
                                fontSize: '12px'
                            }}
                            span={20}>
                            <p>
                                ใช้รหัสนักศึกษา 2 คน สำหรับการจองพื้นที่กีฬาแบดมินตัน
                             </p>
                        </Col>
                    </Row>
                </Col>
            </React.Fragment>
        )
    }
}

export default Form.create()
    (withRouter<RouteComponentProps & FormComponentProps, any>(FormPage))
