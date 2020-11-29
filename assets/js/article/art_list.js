$(function () {
    // 补零
    function padZero(n) {
        return n < 10 ? '0' + n : n
    }
    // 时间过滤器
    template.defaults.imports.dateFormat = function (time) {
        var dr = new Date(time)

        var n = dr.getFullYear()
        var y = padZero(dr.getMonth() + 1)
        var r = padZero(dr.getDate())

        var nn = padZero(dr.getHours())
        var yy = padZero(dr.getMinutes())
        var rr = padZero(dr.getSeconds())
        return `${n} - ${y} - ${r}  ${nn}:${yy}:${rr}`
    }
    // 定义提交参数
    var q = {
        pagenum: '1',//页码值
        pagesize: '2',//每页显示多少条数据
        cate_id: '',//文章分类的 Id
        state: '',//文章的状态，可选值有：已发布、草稿
    }
    // 获取layer
    var layer = layui.layer
    // 获取form
    var form = layui.form
    // 获取数据铺设到页面
    initTable()
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return
                }
                var str = template('tpl-table', res)
                $('tbody').html(str)
                // 分页
                renderPage(res.total)
            }
        })
    }
    // 初始化分类
    initCate()
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return
                }
                var str = template('tpl-cate', res)
                $('[name=cate_id]').html(str)
                // 重新渲染layUI
                form.render()
            }
        })
    }
    // 筛选
    $('#form_search').on('submit', function (e) {
        e.preventDefault()
        // 获取数据
        var cate_id = $('[name=cate_id').val()
        var state = $('[name=state').val()
        // 给到 q 重新渲染
        q.cate_id = cate_id
        q.state = state
        // 重新渲染
        initTable()
    })
    // 获取分页
    var laypage = layui.laypage
    // 分页
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                // 把点击之后的页面给到q 然后渲染
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                // console.log(obj);
                if (!first) {
                    // 重新渲染
                    initTable()
                }
            }
        })
    }
    // 删除
    $('tbody').on('click', '.btn-detele', function () {
        // alert(1)
        // 获取到要删除对应的id
        var id = $(this).attr('data-id')
        // 弹出框
        layer.confirm('确认删除文章?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('恭喜你成功删除文章！')
                    // 
                    var len = $('.btn-detele').length
                    if (len == 1 && q.pagenum > 1) {
                        q.pagenum--
                    }
                    // 获取数据铺设到页面
                    initTable()
                    layer.close(index);
                }
            })

        });

    })
})