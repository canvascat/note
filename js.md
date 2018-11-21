# js

## 函数式编程

优点

- 语义清晰
- 复用性高
- 可维护性好
- 作用域限制，副作用少

## 正则表达式

- tool：[正则可视化](http://wangweilin.net/static/projects/visualRegex/)

### URL匹配

- `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]`
- `(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?`
- `^((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$`

```js
"^((https|http|ftp|rtsp|mms)?://)" 
+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
+ "|" // 允许IP和DOMAIN（域名）
+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名  
+ "[a-z]{2,6})" // first level domain- .com or .museum 
+ "(:[0-9]{1,4})?" // 端口- :80 
+ "((/?)|" // a slash isn't required if there is no file name 
+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"; 
```

```js
// 文本url转a标签url
function linkfilter(msg) {
    var oldMsg = msg
    var urlRegExp = new RegExp('(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]')
    var newMsg = ''
    while (urlRegExp.exec(oldMsg) != null) {
        var strUrl = urlRegExp.exec(oldMsg)[0]
        var tagUrl = '<a href="' + strUrl + '" target="_blank">' + strUrl + '</a>'
        var urlLength = strUrl.length
        var urlStartIndex = oldMsg.indexOf(strUrl)
        newMsg += oldMsg.substring(0, urlStartIndex) + tagUrl
        oldMsg = oldMsg.substring(urlStartIndex + urlLength)
    }
    return msg = newMsg + oldMsg
}
```
