import React, {useState} from 'react';
import styles from "../style.module.less";
import {Button, Form, Input, Modal, Select, Upload} from "antd";
import {formItemLayout} from "@/utils/config.js";
import Feature from "@/store/Feature.js";
import {normFile, picHandler} from "@/utils/index.js";
import {PlusOutlined} from "@ant-design/icons";

const EditorModal = ({isAdd = true,data}) => {
    const [isOpen,setOpen] = useState(false)
    const {addFeature,updateFeature} = Feature

    const showModal = ()=>{
        setOpen(true)
    }

    const hideModal = ()=>{
        setOpen(false);
    }

    const finishHandler = async (values)=>{
        try {
            if(!values.coverUrl){
                if(isAdd){
                    addFeature(values);
                    hideModal()
                    return ;
                }
                updateFeature(data.id,values)
                hideModal()
                return ;
            }
            picHandler(values.coverUrl[0]).then(res=>{
                values.coverUrl = res.data;
                console.log(res)
                if(isAdd){
                    addFeature(values);
                    hideModal()
                    return ;
                }
                updateFeature(data.id,values)
                hideModal()
            })
        }catch (e){
            console.log(e)
        }
    }

    return (
        <>
            {isAdd ? <Button className={`${styles.refresh} blueBtn`} onClick={showModal}>新增特征</Button>:<Button className='blueBtn' onClick={showModal}>编辑</Button>}
            <Modal title={isAdd?"新增特征":'编辑特征'}
                   open={isOpen}
                   onCancel={()=>setOpen(false)}
                   footer={<></>}
                   destroyOnClose={true}
                   maskClosable={false}
            >
                <Form
                    {...formItemLayout}
                    variant="filled"
                    style={{
                        maxWidth: 800,
                        marginTop:'30px'
                    }}
                    onFinish={finishHandler}
                    initialValues={data && {
                        defectType:data.defectType,
                        riskLevel:data.riskLevel,
                        content:data.content,
                        description:data.description
                    }}
                >
                    <Form.Item
                        label="例图"
                        name="coverUrl"
                        required={true}
                        valuePropName='fileList'
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            beforeUpload={()=>false}
                            maxCount={1}
                        >
                            <button
                                style={{
                                    border: 0,
                                    background: 'none',
                                }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >{isAdd?'上传例图':'更改例图'}
                                </div>
                            </button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="隐患等级"
                        name="riskLevel"
                        rules={[
                            {
                                required: true,
                                message: '请输入隐患等级！',
                            },
                        ]}
                    >
                        <Select
                            style={{
                                width: 200,
                            }}
                            placeholder='请选择隐患等级'
                            options={[
                                {
                                    value: '无风险',
                                    label: '无风险',
                                },
                                {
                                    value: '一级风险',
                                    label: '一级风险',
                                },
                                {
                                    value: '二级风险',
                                    label: '二级风险',
                                },
                                {
                                    value: '三级风险',
                                    label: '三级风险',
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="隐患类型"
                        name="defectType"
                        rules={[
                            {
                                required: true,
                                message: '请输入隐患类型！',
                            },
                        ]}
                    >
                        <Select
                            style={{
                                width: 200,
                            }}
                            placeholder='请选择隐患类型'
                            options={[
                                {
                                    text:'完好',
                                    value:'完好'
                                },
                                {
                                    text:'破损',
                                    value:'破损'
                                },
                                {
                                    text:'丢失',
                                    value:'丢失'
                                },
                                {
                                    text:'未覆盖',
                                    value:'未覆盖'
                                },
                                {
                                    text:'井圈问题',
                                    value:'井圈问题'
                                },
                                {
                                    text:'其他类型',
                                    value:'其他类型'
                                }
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="特征"
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: '请输入隐患特征',
                            },
                        ]}
                    >
                        <Input.TextArea className={styles.reasonInput} placeholder='请输入隐患特征'/>
                    </Form.Item>

                    <Form.Item
                        label="风险说明"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: '请输入风险说明',
                            },
                        ]}
                    >
                        <Input.TextArea className={styles.reasonInput} placeholder='请输入风险说明' />
                    </Form.Item>

                    <Form.Item

                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button htmlType="submit" className='blueBtn' style={{marginRight:'30px'}}>
                            {isAdd?'发布':'更改'}
                        </Button>
                        <Button onClick={()=>setOpen(false)}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditorModal;
