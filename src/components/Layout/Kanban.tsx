import React from 'react'
import PageLayout from './Page'
import { Row, Col } from 'antd'
import Outline from '../Outline'

const KanBanLayout: React.FunctionComponent<
    {
        title?: string,
        outline?: string
    }
> = (props) => (
    <React.Fragment>
        <PageLayout titile={props.title || ''}>
            {/* outliner */}
            <Col span={24}>
                <Row type='flex' justify='start'>
                    <Outline text={props.outline || ''} />
                </Row>
            </Col>
            {props.children}
        </PageLayout>
    </React.Fragment>
)

export default KanBanLayout