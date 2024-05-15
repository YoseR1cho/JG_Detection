import React, {useState} from 'react';
import {Button, Form, Input, message, Modal} from "antd";
import styles from "@/pages/admin/User/style.module.less";
import {updateUser} from "@/utils/api.js";
import {PASSWORDEXP} from "@/utils/config.js";

const Password = ({id}) => {
    const [open,setOpen] = useState(false);

    const cancelHandler = ()=> {
        setOpen(false);
    }

    const changeHandler = (values)=>{
        console.log(values);
        updateUser(id,values).then(res=>{
            message.success('密码修改成功！')
            cancelHandler()
        }).catch(()=>{
            message.error('密码修改失败，请重试！')
        })
    }
    return (
        <>
            <Button className={styles.blueBtn} onClick={()=>setOpen(true)}>重置密码</Button>
            <Modal title="更改密码"
                   open={open}
                   footer={<></>}
                   maskClosable={false}
                   onCancel={cancelHandler}
                   destroyOnClose={true}
            >
                <Form
                    onFinish={changeHandler}
                >
                    <Form.Item
                        label='新密码'
                        labelCol={{
                            span:5,
                        }}
                        wrapperCol={{
                            span:16,
                            offset:1
                        }}
                        style={{margin:'30px 0'}}
                        name='password'
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
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item

                        wrapperCol={{
                            offset: 8,
                            span: 18,
                        }}
                    >
                        <Button onClick={cancelHandler}>
                            取消
                        </Button>
                        <Button htmlType="submit" className={styles.blueBtn} style={{marginLeft:'40px'}}>
                            确认
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Password;
