// 对于axios进行二次封装
import axios from "axios";
import { Message } from "element-ui";




// 利用axios对象的方法创建一个实例
const requests = axios.create({
    // 配置对象
    baseURL: "http://localhost:9090",
    // 请求超时时间5s
    timeout: 50000
});


// 请求拦截器，在请求发出之前完成业务
requests.interceptors.request.use((config) => {
    //config:配置对象，里面的header属性，请求头很重要
    config.headers['Content-Type'] = 'application/json;charset=itf-8';

    //请求头带token
    let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    if (user) {
        config.headers['token'] = user.token;
    }

    return config;
}, error => {
    return Promise.reject(error)
});



// 响应拦截器
requests.interceptors.response.use(
    response => {
       
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        // 当权限验证不通过的时候给出提示
        if (res.code === '401') {
            console.log(res)
            Message.info(res.msg)
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


// 对外暴露
export default requests;