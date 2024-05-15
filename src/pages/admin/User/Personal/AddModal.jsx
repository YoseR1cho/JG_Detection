import React from 'react';
import styles from "@/pages/admin/User/style.module.less";
import {Button, Form, Input, message, Modal, Select, Switch} from "antd";
import {PASSWORDEXP, TELEPHONEEXP, USERNAMEEXP} from "@/utils/config.js";
import {request} from "@/utils/axios.js";
import UserList from "@/store/UserList.js";

const AddModal = ({setIsAddOpen,isAddOpen}) => {
    const {loadUsers} = UserList;

    const finishHandler = async (values)=>{
        const {identity,limit,nickName,password,phone} = values;

        try {
            const res1 = await request.post('/user/register',{
                phone,
                password,
                nickName
            })
        }
        catch (e){
            message.error('添加用户失败')
            return ;
        }
        try {
            const res2 = await request.post('/user/login',{
                phone,
                password,
            })
            const id = res2.data.user.id;
            console.log(id);
            try {
                await request.post(`/user/update/${id}`,{
                    job:identity,
                    status:(!limit || limit===true)?1:0
                })
                message.success('添加用户成功')
                loadUsers();
                setIsAddOpen(false);
            }
            catch (e){
                message.error('添加用户失败')
                return ;
            }
        }
        catch (e){
            message.error('添加用户失败')
            return ;
        }
    }
    return (
        <Modal title="添加人员"
               open={isAddOpen}
               onCancel={()=>setIsAddOpen(false)}
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
                autoComplete="off"
                onFinish={finishHandler}
            >
                <Form.Item
                    label="姓名"
                    name="nickName"
                    required={true}
                    rule={[
                        {
                            required: true,
                            message: '请输入姓名',
                        },
                        {
                            pattern:USERNAMEEXP,
                            message: '请输入真实姓名'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>


                <Form.Item
                    label="手机号"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: '请输入手机号',
                        },
                        {
                            pattern:TELEPHONEEXP,
                            message: '请输入正确格式的手机号码'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                        {
                            pattern:PASSWORDEXP,
                            message: '请输入由6-20个字母、数字或下划线组成的密码'
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="身份"
                    name="identity"
                    required={true}
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
                                value: '维修专家',
                                label: '维修专家',
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
                    <Button onClick={()=>setIsAddOpen(false)}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddModal;
