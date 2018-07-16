var oLi = document.getElementsByTagName('li'),
    page = 1,
    flag = true;

function ajaxFun() {
    if (flag) {
        flag = false;
        ajax('get', './getPics/getPics.php', getData, 'cpage=' + page, true);
        page++;
    }
}
ajaxFun();

function getData(data) {
    var value = JSON.parse(data);
    if (value.length > 0) {
        value.forEach(function(ele) {
            var index = minListIndex(oLi),
                oDiv = document.createElement('div'),
                oP = document.createElement('p'),
                oImg = new Image();
            oDiv.className = 'item';
            oImg.style.height = 200 * ele.height / ele.width + 'px';
            oImg.src = ele.preview;
            oP.innerHTML = ele.title;
            oDiv.appendChild(oImg);
            oDiv.appendChild(oP);
            oLi[index].appendChild(oDiv);
            // 图片加载失败了，宽度会撑不开，所以需要手动设置宽高。
            oImg.onerror = function() {
                oImg.style.margin = '-1px';
                oImg.style.width = '202px';
            }
        });
        flag = true;
    }
}


// 寻找最短的li的索引
function minListIndex(dom) {
    var len = dom.length,
        min = dom[0].offsetHeight,
        index = 0;
    for (var i = 1; i < len; i++) {
        if (dom[i].offsetHeight < min) {
            min = dom[i].offsetHeight;
            index = i;
        }
    }
    return index;
}
// 求滚动条是否滚动到底部
window.onscroll = function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
        clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
        minHeight = oLi[minListIndex(oLi)].offsetHeight;
    if (scrollTop + clientHeight >= minHeight) {
        ajaxFun();
    }
}