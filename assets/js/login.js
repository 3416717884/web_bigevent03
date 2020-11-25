$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    var form = layui.form
    var layer = layui.layer
    // 自定义表单验证
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // 获取到密码框的值
            var pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) {
                return '两次输入的值不一样!'
            }
        }
    })
    // 注册绑定提交事件
    $('#form_reg').on('submit', function (e) {
        // 清楚默认样式
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                layer.msg('恭喜你注册成功！', { icon: 6 })
                // 跳转到登录界面
                $('#link_login').click()
                // 把表单内容清空
                $('#form_reg')[0].reset()
            }
        })
    })
    // 登录绑定提交事件
    $('#form_login').on('submit', function (e) {
        // 清楚默认事件
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message ,{icon : 5})
                }
                layer.msg('恭喜你登录成功！',{icon : 6})
                // 把token存到本地 后台需要
                localStorage.setItem('token',res.token)
                // 跳转页面
                location.href = "/index.html"
            }
        })
    })
})