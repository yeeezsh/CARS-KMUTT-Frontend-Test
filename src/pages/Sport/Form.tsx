import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Form, Col, Row, Input } from 'antd'

import styles from './styles.module.css'

import { FormComponentProps } from 'antd/lib/form/Form'

import Outline from '../../components/Outline'
import Button from '../../components/Button'

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

    onSubmit = (e: any): void => {
        e.preventDefault()
        const { form } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                const { keys, names } = values
                console.log('Received values of form: ', values)
                console.log('Merged values:', keys.map((key: any) => names[key]))
            }
            console.log(values)
        })
    }

    onValidator = (rule: any, value: string, callback: any) => {
        const { form } = this.props
        const ids: string[] = form.getFieldValue('users')
        const sets = new Set(ids).size
        if (ids.length !== sets)
            return callback('รหัสนักศึกษาซ้ำ')
        // if (ids.includes(value)) {
        //     console.log('summmmm ja')
        // }
        console.log('idsss', ids)
        if (value === '') callback()
        if (value.length !== 11)
            return callback('โปรดกรอกรหัสนักศึกษาให้ถูกต้อง')
        return callback()

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
                            <Form onSubmit={this.onSubmit}>
                                {
                                    this.state.users.map((e, i) => {
                                        return (
                                            <Form.Item key={i}>
                                                {
                                                    getFieldDecorator(`users[${i}]`, {
                                                        rules: [{
                                                            required: true,
                                                            message: 'โปรดกรอกรหัสนักศึกษาให้ถูกต้อง',
                                                            max: 11
                                                        },
                                                        {
                                                            required: true,
                                                            validator: this.onValidator,
                                                        }
                                                        ],
                                                        validateTrigger: ['onBlur']
                                                    })(
                                                        <Input
                                                            placeholder={`รหัสนักศึกษาคนที่ ${i + 1}`}
                                                            type={'number'}
                                                        />
                                                    )
                                                }
                                            </Form.Item>
                                        )
                                    })
                                }
                                <Button>ต่อไป</Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </React.Fragment >
        )
    }
}

export default Form.create()
    (withRouter<RouteComponentProps & FormComponentProps, any>(FormPage))
