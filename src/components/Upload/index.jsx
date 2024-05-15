import React from 'react';
import {Upload} from "antd";

import Image from "@/store/Image.js";
import State from "@/store/State.js";
import {observer} from "mobx-react";

const Index = ({children}) => {

    const {setUrl,setName,setForm} = Image;
    const {setOpen} = State;



    const beforeUploadHandler = ()=>{
        return false;
    }

    const changeHandler = async (info) =>{
        const form  = new FormData();
        let fileObj = info.file.originFileObj ? info.file.originFileObj : info.file
        form.append('file',fileObj);
        const getBase64 = (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        let preview = await getBase64(fileObj);


        setOpen(1);
        setUrl(preview);
        setName(fileObj.name);
        setForm(form);
    }
    return (
        <>
            <Upload
                beforeUpload={beforeUploadHandler}
                onChange={changeHandler}
                name='file'
                multiple={false}
                showUploadList={false}
            >{children}</Upload>
        </>
    );
};

export default observer(Index);
