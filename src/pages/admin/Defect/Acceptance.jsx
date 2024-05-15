import React, {useState} from 'react';
import {Button, Col, Image, Modal, Row} from "antd";

const TitleCol = ({children})=>(
    <Col span={6} style={{fontSize:'18px',fontWeight:400,color:'#727272'}}>{children}</Col>
)

const Acceptance = ({data}) => {
    const [isOpen,setOpen] = useState(false)

    const showModal = ()=>{
        setOpen(true)
    }

    const hideModal = ()=>{
        setOpen(false);
    }

    return (
        <>
            <Button className='blueBtn' onClick={showModal} style={{display:(data.status!=='专家复审通过，可销项'&& data.status!=='专家复审未通过，返工')&&'none'}}>验收情况</Button>
            <Modal title={"验收情况详情"}
                   open={isOpen}
                   onCancel={hideModal}
                   footer={<></>}
                   destroyOnClose={true}
                   maskClosable={false}
            >
                <Row align={"middle"} style={{marginTop:'40px'}}>
                    <TitleCol>维修结果：</TitleCol>
                    <Col span={18}>
                        <Image src={data.repairedUrl} height={200} width={300}/>
                    </Col>
                </Row>
                <Row align={"middle"} style={{marginTop:'40px'}}>
                    <TitleCol>验收结果：</TitleCol>
                    <Col span={18}>
                        <p style={{fontSize:'18px',color:data.status==='专家复审未通过，返工'?'red':'#00c700'}}>{data.status}</p>
                    </Col>
                </Row>
                <Row align={"middle"} style={{marginTop:'40px'}}>
                    <TitleCol>验收意见：</TitleCol>
                    <Col span={18}>
                        <p style={{fontSize:'18px'}}>{data.advice}</p>
                    </Col>
                </Row>
                <Row align={"middle"} style={{marginTop:'40px'}}>
                    <TitleCol>验收人员：</TitleCol>
                    <Col span={18}>
                        <p style={{fontSize:'18px'}}>{data.inspectedInfo.match(/人:([^;]+)/)[1]}</p>
                    </Col>
                </Row>
                <Row align={"middle"} style={{marginTop:'40px'}}>
                    <TitleCol>验收时间：</TitleCol>
                    <Col span={18}>
                        <p style={{fontSize:'18px'}}>{data.createTime}</p>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default Acceptance;
