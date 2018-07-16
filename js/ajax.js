// 这个函数是用原生js封装的ajax请求
function ajax(method, url, callback, data, flag) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(xhr.responseText);
            } else {
                console.log('error');
            }
        }
    }
    method = method.toUpperCase();
    if (method === 'GET') {
        var date = new Date(),
            timer = date.getTime();
        if (data) {
            xhr.open(method, `${url}?${data}&timer=${timer}`, flag);
        } else {
            xhr.open(mehhod, `${url}?timer=${timer}`, flag);
        }
        xhr.send();
    } else if (method === 'POST') {
        xhr(method, url, flag);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
}