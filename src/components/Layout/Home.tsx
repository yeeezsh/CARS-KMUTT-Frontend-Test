import React, { Props } from 'react'
import { Layout } from 'antd'
const { Sider, Header, Content } = Layout

export default function HomeLayout(props: Props<any>) {
    return (
        <Layout>
            <Sider>Sider</Sider>
            <Layout>
                <Header>
                    <Header>Header</Header>
                    <Content>{props.children}</Content>
                </Header>
            </Layout>
        </Layout>
    )
}
