$(function () {
    // 获取信息
    getUserInog();
    // 退出按钮
    $('#logout').on('click', function () {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地
            localStorage.removeItem('token')
            // 跳转
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
function getUserInog() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message, { icon: 5 })
            }
            // 获取到的用户数据
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    // 获取到用户数据然后通过赋值的方式铺设到页面上
    var name = user.nickname || user.username
    $('#wolcome').html('欢迎&nbsp&nbsp' + name)
    // 图片
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        var text = name[0].toUpperCase()
        $('.text-avatar').html(text)
        $('.layui-nav-img').hide()
    }
}