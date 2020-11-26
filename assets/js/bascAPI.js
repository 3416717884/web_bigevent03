$(function () {
    var url = 'http://ajax.frontend.itheima.net'
    $.ajaxPrefilter(function (params) {
        params.url = url + params.url
        // 路劲中如果有/my/ 就添加 headers
        if (params.url.indexOf('/my/') !== -1) {
            params.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        // 拦截所有响应
        params.complete = function (res) {
            console.log(res);
            if (res.responseJSON.status !== 0 && res.responseJSON.message == '身份认证失败！') {
                // 清空本地
                localStorage.removeItem('token')
                // 跳转
                location.href = '/login.html'
            }
        }
    })

})