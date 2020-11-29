$(function () {
    // 获取数据
    initArtCateLis()
    // 获取layer
    var layer = layui.layer
    // 获取form
    var form = layui.form
    function initArtCateLis() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 模板引擎
                var str = template('tpl-table', res)
                $('tbody').html(str)
            }
        })
    }
    // 关闭层
    var indexAdd = null
    // 添加类别
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '在线调试',
            content: $('#dialog-add').html(),
            area: ['500px', '260px']
        });
    })
    // 提交
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你添加成功！')
                // 获取数据
                initArtCateLis()
                // 关闭层
                layer.close(indexAdd)
            }
        })
    })
    // 关闭层
    var indexEdit = null
    // 点击 修改
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '在线调试',
            content: $('#dialog-edit').html(),
            area: ['500px', '260px']
        });
        // 获取id索引
        var Id = $(this).attr('data-id')
        // console.log(Id);
        // 获取 数据 渲染到修改框上
        $.ajax({
            url: '/my/article/cates/' + Id,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 把数据 赋值到表单上
                form.val('form-edit', res.data)
            }
        })
    })
    // 把修改后的 铺到页面上
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你成功更改！')
                // 获取数据
                initArtCateLis()
                // 关闭层
                layer.close(indexEdit)
            }
        })
    })
    // 删除按钮 点击事件
    $('tbody').on('click', '.btn-delete', function () {
        var Id = $(this).siblings('.btn-edit').attr('data-id')
        // console.log(Id);
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('恭喜你成功删除！')
                    // 获取数据
                    initArtCateLis()
                    layer.close(index);
                }
            })
        });
    })
})