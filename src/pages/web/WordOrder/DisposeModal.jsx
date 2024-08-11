import React, { useState } from "react";
import styles from "@/pages/web/WordOrder/style.module.less";

import {
    Button,
    ConfigProvider,
    DatePicker,
    Form,
    Input,
    message,
    Modal,
    Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import locale from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

import { uploadRepairPic } from "@/utils/api.js";
import { observer } from "mobx-react";
import { normFile } from "@/utils/index.js";
import { useStores } from "@/store/index.js";

dayjs.locale("zh-cn");

const DisposeModal = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { User, WorkOrder, Event } = useStores();
    const { id: _id } = User;
    const { TextArea } = Input;
    const { loadWorkOrderList } = WorkOrder;
    const { disposeEvent } = Event;
    const showDisposeModal = () => {
        setIsOpen(true);
    };
    const handleRDisposeCancel = () => {
        setIsOpen(false);
    };

    const handleDispose = async (values) => {
        let fileObj = values.upload[0].originFileObj
            ? values.upload[0].originFileObj
            : values.upload[0];
        const form = new FormData();
        form.append("file", fileObj);
        try {
            const repairedUrl = (await uploadRepairPic(form, data.picId)).data;

            await disposeEvent(data.id, repairedUrl);
            loadWorkOrderList();
            message.success("工单处理成功！");
            handleRDisposeCancel();
        } catch (e) {
            console.log(e);
            message.error("工单处理失败，请重试！");
            handleRDisposeCancel();
        }
    };
    return (
        <>
            <Button className={styles.greenBtn} onClick={showDisposeModal}>
                处理
            </Button>
            <Modal
                title="工单处理"
                open={isOpen}
                onCancel={handleRDisposeCancel}
                footer={<></>}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 1200,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    className={styles.form}
                    onFinish={handleDispose}
                >
                    <ConfigProvider locale={locale}>
                        <Form.Item
                            name="date"
                            label="处理日期"
                            placeholder="选择处理日期"
                            required={true}
                        >
                            <DatePicker
                                maxDate={dayjs()}
                                minDate={dayjs().subtract(60, "day")}
                                showTime
                            />
                        </Form.Item>
                    </ConfigProvider>

                    <Form.Item label="处理结果" name="result" required={true}>
                        <TextArea rows={6} placeholder="请在此填写处理结果" />
                    </Form.Item>
                    <Form.Item
                        label="结果图片"
                        wrapperCol={{ offset: 3 }}
                        name="upload"
                        required={true}
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            beforeUpload={() => false}
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
                                ></div>
                            </button>
                        </Upload>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6 }}>
                        <Button
                            onClick={handleRDisposeCancel}
                            style={{ marginRight: "100px" }}
                        >
                            取消
                        </Button>
                        <Button className={styles.greenBtn} htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default observer(DisposeModal);
