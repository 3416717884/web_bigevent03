$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称只能输入 1 ~ 6 位数之间'
            }
        }
    })
    // 用户渲染
    initUserInfo()
    // 调用 layer
    var layer = layui.layer
    // 调用
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 渲染
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置
    $('#btnReset').on('click', function (e) {
        // 清楚重置
        e.preventDefault()
        // 重新渲染
        initUserInfo()
    })
    // 修改用户信息
    $('.layui-form').on('submit', function (e) {
        // 清楚提交
        e.preventDefault()
        // 获取修改
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 
                layer.msg('恭喜你修改资料成功！')
                // 重新渲染页面
                window.parent.getUserInog()
            }
        })
    })
})