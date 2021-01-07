# 文件上传

1. 表单

```html
<form action="url" method="post" enctype="multipart/form-data">
  <input type="file" name="myfile" id="myfile" />
  <input type="submit" value="update" />
</form>
```

2. 文件编码

- base64

```js
function imgToBase64(imgFile) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const imgURL = URL.createObjectURL(imgFile)
  ctx.drawImage(imgURL, 0, 0)
  // 获取图片的编码，然后将图片当做是一个很长的字符串进行传递
  return canvas.toDataURL('image/jpeg', 0.5)
}
```

- 数据流

```js
function readFileBinary(file, cb) {
  // 前端读取文件内容后以二进制格式上传
  const fileReader = new FileReader()
  fileReader.onload = () => {
    const len = this.result.length
    const data = new ArrayBuffer(len)
    const ui8a = new Uint8Array(data, 0)
    for (let i = 0; i < len; i++) {
      ui8a[i] = this.result.charCodeAt(i) & 0xff
    }
    cb && cb(ui8a)
  }
  fileReader.readAsBinaryString(file)
}
```

- formData

```js
function formDataUpload(file, url) {
  const formData = new FormData()
  formData.append('file', file)
  // axios.post(url, formData)
  const xhr = new XMLHttpRequest()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.onreadystatechange = () => {
    if ((xhr.readyState === 4 && xhr.status === 200) || xhr.status === 304) {
      cb.call(this, xhr.responseText)
    }
  }
  xhr.send(formData)
}
```

## 大文件上传

大文件上传最主要的问题就在于：**在同一个请求中，要上传大量的数据，导致整个过程会比较漫长，且失败后需要重头开始上传**。试想，如果我们将这个请求拆分成多个请求，每个请求的时间就会缩短，且如果某个请求失败，只需要重新发送这一次请求即可，无需从头开始。

综合上面的问题，看来大文件上传需要实现下面几个需求

- 支持拆分上传请求(即切片)
- 支持断点续传
- 支持显示上传进度和暂停上传

接下来让我们依次实现这些功能，看起来最主要的功能应该就是切片了。

### 文件切片
