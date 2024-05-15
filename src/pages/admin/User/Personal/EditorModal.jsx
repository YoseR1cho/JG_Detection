import React from 'react';
import styles from "@/pages/admin/User/style.module.less";
import {Button, Form, Input, message, Modal, Select, Switch} from "antd";
import {request} from "@/utils/axios.js";
import UserList from "@/store/UserList.js";

const EditorModal = ({isEditorOpen,setIsEditorOpen,state}) => {
    const {loadUsers} = UserList;

    const handleEditorCancel = ()=>{
        setIsEditorOpen(false);
    }


    const finishHandler = (values)=>{
        console.log(state.id);
        request.post(`/user/update/${state.id}`,{
            nickName:values.nickName === state.nickName ? null:values.nickName,
            status:values.limit ? 1:0,
            job:values.identity
        }).then(res=>{
            message.success('信息更改成功');
            loadUsers();
            handleEditorCancel()
        }).catch(e=>{
            message.error('信息更改失败');
            handleEditorCancel()
        })
    }
    return (
        <Modal title="用户信息修改"
               open={isEditorOpen}
               onCancel={handleEditorCancel}
               footer={<></>}
               destroyOnClose={true}
               maskClosable={false}
        >
            <Form
                name="basic"
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                    marginTop:30
                }}
                initialValues={{
                    nickName:state.nickName,
                    identity:state.identity,
                    limit:state.limit
                }}
                autoComplete="off"
                onFinish={finishHandler}
            >
                <Form.Item
                    label="姓名"
                    name="nickName"
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="身份"
                    name="identity"
                >
                    <Select
                        style={{
                            width: 150,
                        }}
                        options={[
                            {
                                value: '会审专家',
                                label: '会审专家',
                            },
                            {
                                value: '巡检人员',
                                label: '巡检人员',
                            },
                            {
                                value: '维修人员',
                                label: '维修人员',
                            },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="是否允许登录"
                    name="limit"
                    labelCol={{
                        offset: 1
                    }}
                >
                    <Switch defaultChecked={true}/>
                </Form.Item>

                <Form.Item

                    wrapperCol={{
                        offset: 8,
                        span: 18,
                    }}
                >
                    <Button htmlType="submit" className={styles.blueBtn} style={{marginRight:'30px'}}>
                        确认
                    </Button>
                    <Button onClick={handleEditorCancel}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditorModal;
