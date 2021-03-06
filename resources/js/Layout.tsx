import React, { useEffect } from 'react'
import { InertiaLink } from '@inertiajs/inertia-react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AppLayout({title, children}: AppLayoutProps) {
    useEffect(() => {
        document.title = title;
    }, [title])

    return (
        <Layout>
            <Header className="header" hidden>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1">
                        <InertiaLink href={route('home')}>home</InertiaLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <InertiaLink href={route('about')}>about</InertiaLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <InertiaLink href={route('accounts')}>accounts</InertiaLink>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{padding: '0 50px'}}>
                <Breadcrumb style={{margin: '16px 0', display: 'none'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                    <Sider className="site-layout-background" width={200} hidden>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%'}}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: 280}}>
                        {children}
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                <a href="https://github.com/Serabass/inertiajs-sandbox" target="_blank">Github</a>
            </Footer>
        </Layout>
    )
}
