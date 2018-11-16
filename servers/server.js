var http = require('http');
var cheerio = require('cheerio');

var url = 'http://www.webpagefx.com/tools/emoji-cheat-sheet/';

http.get(url, function (res) {
    var html = '';
    res.on('data', function (data) {
        console.log(data)

        html += data;
    });
    res.on('end', function () {
        var slideListData = filterSlideList(html);
        printInfo(slideListData);
    });
}).on('error', function () {
    console.log('获取数据出错！');
});

function filterSlideList (html) {
    console.log(html)
    if (html) {
        var $ = cheerio.load(html);
        var slideList = $('#partB .bd');
        var slideListData = [];
        slideList.find('li').each(function (item) {
            var pic = $(this);
            var pic_href = pic.find('a').attr('href');
            var pic_src = pic.find('a').children('img').attr('_src');
            var pic_message = pic.find('a').children('img').attr('alt');
            slideListData.push({
                pic_href : pic_href,
                pic_message : pic_message,
                pic_src : pic_src
            });
        });
        return slideListData;
    } else {
        console.log('无数据传入！');
    }
}

function printInfo (slideListData) {
    var count = 0;
    console.log('***', slideListData)
    // slideListData.forEach(function(item) {
    //     // 获取图片
    //     var pic_src = item.pic_src;
    //     // 获取图片对应的链接地址
    //     var pic_href = item.pic_href;
    //     // 获取图片信息
    //     var pic_message = item.pic_message;
    //     // 打印信息
    //     console.log('****\\第' + (++count) + '/****');
    //     console.log(pic_message);
    //     console.log(pic_href);
    //     console.log(pic_src);
    //     console.log('\n');
    // });
}
