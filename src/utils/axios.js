import axios from 'axios'
export const request = axios.create({
    baseURL:'http://47.109.204.138:8080',
    transformResponse: [ config => JSON.parse(config.replace(/(?<=someNo":)(\d{0,})/g,'"$1"')) ],
    timeout:60000
})

let timer;

// 拦截请求
request.interceptors.request.use(
    config => {
        /*const token = getToken();
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }*/
        return config
    },
    error => {
        message.error('bad request')
        return Promise.reject(error)
    }
)

// 拦截响应
request.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        /*if(response.data.code!=='0000'){
            switch (response.data.code){
                // 登录错误处理
                case '3001':
                    throw new Error(response.data.msg);
                //注册错误处理
                case '3002':
                    throw new Error(response.data.msg);
            }

        }*/
        return response.data;
    },
    err => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        clearTimeout(timer)
        timer = setTimeout(() => {
            /*if (err.response) {
                const { status, data } = err.response
                switch (status) {
                    case 401:
                        message.error((data && data.message) || '登录信息过期或未授权，请重新登录！')
                        break

                    default:
                        message.error(data.message || `连接错误 ${status}！`)
                        break
                }
            } else {
                console.log(err.message)
                // message.error(err.message)
            }*/
        }, 200) // 200 毫秒内重复报错则只提示一次！

        return Promise.reject(err);
    }
)

