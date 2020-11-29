$(function () {
    // 获取layer
    var layer = layui.layer
    // 获取form
    var form = layui.form
    // 获取下拉菜单数据
    initCate()
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 重新渲染layUI
                form.render()
            }
        })
    }
    // 初始化富文本编辑器
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 给上传设置点击事件
    $('#btnCooseImage').on('click', function () {
        // 触发上传文件
        $('#file').click()
    })
    // 给上传文件设置change事件
    $('#file').change(function (e) {
        // 获取文件列表
        var files = e.target.files[0]
        // 非空效验
        if (files == undefined) {
            return
        }
        // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(files)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    // 
    var state = '已发布'
    $('#btnSava2').on('click', function () {
        state = '草稿'
    })
    // 提交文章
    $('#form-cate').submit(function (e) {
        // 清楚默认
        e.preventDefault()
        // 创建一个 formDefa
        var fd = new FormData(this)
        // console.log(...fd);
        fd.append('state', state)
        // console.log(...fd);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                // console.log(...fd);
                publishArticle(fd)
            })
    })
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你添加文章成功！')
                // 跳转页面
                // location.href = '/article/art_list.html'
                setTimeout(() => {
                    window.parent.document.querySelector("#art_list").click()
                }, 1000);
            }
        })
    }
})