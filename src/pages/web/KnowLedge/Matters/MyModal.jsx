import React, { useState } from "react";
import styles from "@/pages/web/KnowLedge/Matters/style.module.less";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Upload } from "antd";

import { normFile, picHandler } from "@/utils/index.js";
import { useStores } from "@/store/index.js";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};

const MyModal = ({ addArticle }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { Matter } = useStores();
    const { addMatter } = Matter;

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const finishHandler = (values) => {
        try {
            if (!values.coverUrl) {
                addMatter(values);
                handleCancel();
                return;
            }
            picHandler(values.coverUrl[0]).then((res) => {
                values.coverUrl = res.data;
                addMatter(values);
                handleCancel();
            });
        } catch (e) {
            console.log(e);
        }
        message.success("感谢您的补充！");
        handleOk();
    };
    return (
        <>
            <button className={styles.supply} onClick={showModal}>
                <PlusOutlined />
            </button>
            <Modal
                destroyOnClose
                title="新增"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => {
                    handleCancel();
                }}
                footer={null}
            >
                <Form
                    {...formItemLayout}
                    variant="filled"
                    style={{
                        maxWidth: 600,
                        marginTop: "30px",
                    }}
                    onFinish={finishHandler}
                >
                    <Form.Item
                        label="问题"
                        name="question"
                        rules={[
                            {
                                required: true,
                                message: "请输入原因/建议！",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="解决方案"
                        name="resolution"
                        rules={[
                            {
                                required: true,
                                message: "请输入原因/建议！",
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="封面"
                        name="coverUrl"
                        required={true}
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            beforeUpload={() => false}
                            maxCount={1}
                        >
                            <button
                                style={{
                                    border: 0,
                                    background: "none",
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    上传封面
                                </div>
                            </button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            新增
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default MyModal;
