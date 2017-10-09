var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
  },
  onLoad: function () {
    var that = this;
    /**
     * 初始化emoji设置
     */
    WxParse.emojisInit('[]', "/wxParse/emojis/", {
      "00": "00.gif",
      "01": "01.gif",
      "02": "02.gif",
      "03": "03.gif",
      "04": "04.gif",
      "05": "05.gif",
      "06": "06.gif",
      "07": "07.gif",
      "08": "08.gif",
      "09": "09.gif",
      "09": "09.gif",
      "10": "10.gif",
      "11": "11.gif",
      "12": "12.gif",
      "13": "13.gif",
      "14": "14.gif",
      "15": "15.gif",
      "16": "16.gif",
      "17": "17.gif",
      "18": "18.gif",
      "19": "19.gif",
    });
    /**
     * html解析示例
     */
    var article = `
    # h1 Heading
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

>
  dddd
  
    `;
		
    
    WxParse.wxParse('article', 'md', article, that, 5);


    /**
     * 多数据解析示例
     */
    var replyHtml0 = `<div style="margin-top:10px;height:50px;">
		<p class="reply">
			wxParse回复0:不错，喜欢[03][04]
		</p>	
	</div>`;
    var replyHtml1 = `<div style="margin-top:10px;height:50px;">
		<p class="reply">
			wxParse回复1:不错，喜欢[03][04]
		</p>	
	</div>`;
    var replyHtml2 = `<div style="margin-top:10px;height:50px;">
		<p class="reply">
			wxParse回复2:不错，喜欢[05][07]
		</p>	
	</div>`;
    var replyHtml3 = `<div style="margin-top:10px;height:50px;">
		<p class="reply">
			wxParse回复3:不错，喜欢[06][08]
		</p>	
	</div>`;
    var replyHtml4 = `<div style="margin-top:10px; height:50px;">
		<p class="reply">
			wxParse回复4:不错，喜欢[09][08]
		</p>	
	</div>`;
    var replyHtml5 = `<div style="margin-top:10px;height:50px;">
		<p class="reply">
			wxParse回复5:不错，喜欢[07][08]
		</p>	
	</div>`;
    var replyArr = [];
    replyArr.push(replyHtml0);
    replyArr.push(replyHtml1);
    replyArr.push(replyHtml2);
    replyArr.push(replyHtml3);
    replyArr.push(replyHtml4);
    replyArr.push(replyHtml5);


    for (let i = 0; i < replyArr.length; i++) {
      WxParse.wxParse('reply' + i, 'html', replyArr[i], that);
      if (i === replyArr.length - 1) {
        WxParse.wxParseTemArray("replyTemArray",'reply', replyArr.length, that)
      }
    }
  }


})
