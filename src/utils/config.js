import Record from "@/store/Image.js";

export const USERNAMEEXP = /^([\u4e00-\u9fa5]{2,20}|[a-zA-Z.\s]{2,20})$/;     //2-20个英文或中文姓名

export const PASSWORDEXP = /^(?=.*[a-zA-Z])(?=.*\d).{6,20}$/    //密码正则 6到20个数字+字母

export const TELEPHONEEXP = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

export const LOGINID = 'MANHOLE_COVER_DETECTION_ID'

export const SYSTEMSTATUS = 'MANHOLE_COVER_DETECTION_SYSTEMSTATUS'


export const GDKEY = '7fb11fba3f15a87b57d378c78b989dc6';

export const uploadProps = {

    customRequest: async (file)=>{

        await Record.uploadImage(form);
    }
}

export const formItemLayout = {
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

