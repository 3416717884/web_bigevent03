$(function () {
    var url = 'http://ajax.frontend.itheima.net'
    $.ajaxPrefilter(function (params) {
        params.url = url + params.url
    })
})