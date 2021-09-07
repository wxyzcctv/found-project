import axios from "axios";
import { Message, Loading } from 'element-ui';
import router from './router/index'

let loading;
// 定义开始加载动画的函数
function startLoading() {

    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,.7)'
    });
}
// 定义结束加载动画的函数
function endLoading() {
    loading.close()
}

// 请求拦截
axios.interceptors.request.use(config => {
    // 加载动画
    startLoading();

    // 对于正常的请求需要加入统一的请求header
    if (localStorage.getItem('userToken')) {
        config.headers.Authorization = localStorage.getItem('userToken')
    }

    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
    // 结束加载动画
    endLoading();
    return response
}, error => {
    // 错误提醒
    endLoading();
    Message.error(error.response.data);

    // 在响应请求时需要校验token是否已经失效，
    // 如果已经失效就需要删除这个token并且跳转到登录页
    // 获取错误状态码
    const { status } = error.response;
    if (status === 401) {
        Message.error('token失效，请重新登录');
        // 清除token
        localStorage.removeItem("userToken");
        // 跳转到登录页面
        router.push('/login')
    }

    return Promise.reject(error)
})

export default axios