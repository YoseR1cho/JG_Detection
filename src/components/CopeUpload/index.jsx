import React, { useEffect, useState } from "react";
import { Upload, notification } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
const CopeUpload = ({ children, onChange, originUrl='', isCompress, maxWidthOrHeight }) => {

    const [loading, setLoading] = useState(false)
    const [fileLists, setFileList] = useState([]);

    useEffect(() => {
        if(originUrl) {
            setFileList([{
                imgUrl: originUrl,
                url: originUrl,
                status: 'done',
                name: 'image.png',
                uid: originUrl
            }])
        }
    }, [originUrl])

    const triggerChange = (changedValue) => {
        if (onChange) {
            onChange({...changedValue});
        }
    };


    const handleChange = (info) => {
        const { file } = info;
        let { fileList: files } = info;
        files = files.map((e_file) => {
            if (e_file.response) {
                e_file.id = e_file.uid;
                e_file.imgUrl = e_file.response.data.fileUrl //请求之后返回的key
            }
            return e_file;
        });
        if (file.status) {
            if (file.status === 'done') {
                const response = info.file.response;
                const { code, msg, data } = response;
                if(code !== 'A00000') {
                    notification.open({
                        message: '上传出错',
                        description: msg
                    });
                    setLoading(false);
                    return;
                }
                triggerChange(data);
                // triggerChange(files);
            } else if (file.status === 'error') {
                console.log('上传失败')
            } else if (file.status === 'removed') {
                triggerChange({});
            }
        }
        setFileList([...files]);
    };

    const uploadButton = (
        <div>
            {/* {loading ? <LoadingOutlined/> : <PlusOutlined/>} */}
            <PlusOutlined />
            <div style={{marginTop: 8}}> {children} </div>
        </div>
    );

    return (
        <Upload
            name="file"
            listType="picture-card"
            className="uploader"
            fileList={fileLists}
            beforeUpload={(file, fileList) => {
                const fileName = file.name.split('.')[0];
                return new Promise(async (resolve, reject) => {
                    if(isCompress) {
                        const file_ = await readImg(file);
                        const newFile = await compressImg(file_, file.type, fileName, maxWidthOrHeight)
                        resolve(newFile)
                    } else {
                        resolve(file);
                    }
                })
            }}
            action={`${upload_url}`}
            onChange={handleChange}
            data={{is_big_file: false}}
            accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
        >
            {fileLists.length > 0 ? null : uploadButton}
        </Upload>
    );
}

export default CopeUpload;
