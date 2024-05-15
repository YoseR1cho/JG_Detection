import React from 'react';
import styles from './styles.module.css'
import {Layout, theme} from "antd";
const { Content ,Footer} = Layout;

const Index = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            <Content
                style={{
                    margin: '24px 16px 0',
                }}
            >
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <View/>
                </div>

            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©2023 Created by Ant UED
            </Footer>
        </>
    );
};

export default Index;
