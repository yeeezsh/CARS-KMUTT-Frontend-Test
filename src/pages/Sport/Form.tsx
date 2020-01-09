import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Form, Col, Row, Input } from 'antd'

import styles from './styles.module.css'

import { FormComponentProps } from 'antd/lib/form/Form'

import Outline from '../../components/Outline'

class FormPage extends Component<
    RouteComponentProps<any> & FormComponentProps &
    {
        required?: number
    }
    ,
    {
        users: string[],
        required: number
    }
    > {

    state = {
        users: [],
        required: 2
    }

    componentDidMount = () => {
        const required = this.props.required || this.state.required
        const users = Array(required).fill('')
        return this.setState({ users })
    }

    render() {
        const { getFieldDecorator } = this.props.form
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
                            className={styles.desc}
                            span={20}>
                            <p>
                                ใช้รหัสนักศึกษา 2 คน สำหรับการจองพื้นที่กีฬาแบดมินตัน
                             </p>
                        </Col>
                    </Row>
                </Col>

                {/* Form */}
                <Col span={24}>
                    <Row type='flex' justify='center'>
                        <Col span={20}>
                            <Form>
                                {
                                    this.state.users.map((e, i) => {
                                        return (
                                            <Form.Item key={i}>
                                                {
                                                    getFieldDecorator('users', {
                                                        rules: [{ required: true }]
                                                    })(
                                                        <Input placeholder={`รหัสนักศึกษาคนที่ ${i + 1}`} />
                                                    )
                                                }
                                            </Form.Item>
                                        )
                                    })
                                }
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </React.Fragment>
        )
    }
}

export default Form.create()
    (withRouter<RouteComponentProps & FormComponentProps, any>(FormPage))
