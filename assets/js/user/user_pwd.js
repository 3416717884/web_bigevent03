$(function () {
    // 定义 layer
    var layer = layui.layer
    // 定义form
    var form = layui.form
    // 表单制定规则
    form.verify({
        Pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $("[name=oldPwd]").val()) {
                return '新密码不能和旧密码一致'
            }
        },
        rePwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return '俩次输入的密码不能一致'
            }
        }
    })
    // 表单提交
    $('.layui-form').on('submit', function (e) {
        // 清楚默认
        e.preventDefault()
        // ajax
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你修改密码成功！')
                // window.parent.location.href = '/login.html'
                // 清空表单
                $('.layui-form')[0].reset()
            }
        })
    })
})