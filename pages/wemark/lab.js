// 引入wemark
var wemark = require('../../wemark/wemark');
// 需要渲染的Markdown文本
var md = `# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

这是一段普通的文字，中间有一点\`代码\`，还有点**加粗**的文字。

普通~~被删除的文字~~哈哈

- 无序列表1
- 无序列表2
	- 子项目
	- 子项目

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


![图片来一张](https://www.toobug.net/logo.png)

\`\`\`javascript
// 代码啊

console.log(123);
\`\`\`

hello

|表头1|表头2|表头3|
|----|-----|----|
|11|12|13|
|21|22|23|

<video>
<source src="http://html5demos.com/assets/dizzy.mp4">
</source>
</video>

<video src="http://html5demos.com/assets/dizzy.mp4"></video>

<video>
<source src="http://html5demos.com/assets/dizzy.mp4" poster="http://via.placeholder.com/350x150">
</source>
</video>

<video src="http://html5demos.com/assets/dizzy.mp4" poster="http://via.placeholder.com/350x150"></video>
`;


Page({
  data: {
    // 确定一个数据名称
    wemark: {}
  },
  onReady: function () {
    wemark.parse(md, this, {
      // 新版小程序可自适应宽高
      // imageWidth: wx.getSystemInfoSync().windowWidth - 40,
      name: 'wemark'
    })
  }
});