
Page({

  data: {
    showTopTips: false,
    topTipMsg: '',
    form: {},
    blocks: [
      { 'index': 0, 'value': '' }
      // { 'index': 0, type: 'text', 'value': '' },
      // { 'index': 0, type: 'image', 'value': 'http://mat1.gtimg.com/xian/dcls2017/icon-image.png'
      //}
    ],
    nodes: [],
    showControlIndex: "",
    
    nodes3: [{
      name: 'img',
      attrs: {
        src: "http://mat1.gtimg.com/xian/dcls2017/icon-down.png",
        class: 'url',
        style: 'display:block; margin-top:10px; color: pink;background: #efefef; padding: 5px 5px; border-left:3px solid #CCC;'
      },
      children: [{
        type: 'text',
        text: `del:这是删除线`,
      }]
    }]
  },

  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },

  // 编辑器
  tapIcon(e) {
    console.log('taped icon...', e)    
    let that = this;
    let tag = e.target.id || ''
    let nodes = that.data.nodes
    switch(tag) {
      // title
      case 'H2': 
      case 'H3':
      case 'H4':
      case 'H5': {
        nodes.push([{
          name: tag.toLowerCase(),
          attrs: {
            class: tag.toLowerCase(),
          },
          children: [{
            type: 'text',
            text: '点击输入标题',
          }]
        }])
        break;
      }

      // pargraph
      case 'P': {
        nodes.push([{
          name: tag.toLowerCase(),
          attrs: {
            class: tag.toLowerCase(),
          },
          children: [{
            type: 'text',
            text: '点击输入文本内容',
          }]
        }])
        break;
      }

      // pargraph
      case 'BLOCKQUOTE': {
        nodes.push([{
          name: tag.toLowerCase(),
          attrs: {
            class: tag.toLowerCase(),
          },
          children: [{
            type: 'text',
            text: '点击输入引用内容',
          }]
        }])
        break;
      }

      default:
        console.log('no icon logic matched')
      };

    console.log(nodes);
      that.setData({
        nodes: nodes
      })
  },

  tap(event) {
    console.log('taped...', event)
  },

  longtap(event) {
    console.log('longtap...', event)
  },

  touchmove(event) {
    console.log('touchmove...', event)
  }, 
  
  touchend(event) {
    console.log('touchend...', event)
  },

  // textarea 输入
  textareaInput(event) {
    console.log('textareaBlur:', event)
    let that = this;
    let value = event.detail.value;
    let index = event.target.dataset.index;
    let nodes = that.data.nodes
    console.log('nodes,', index, nodes)
    if (value) {
      if (nodes[index]) {
        if (nodes[index][0].children[0].type == 'text') {
          nodes[index][0].children[0].text = value;
        }
      }
      that.setData({
        nodes: nodes
      })
    }
  },

  // textarea 失去焦点时赋值给rich-text
  textareaBlur(event) {
    console.log('textareaBlur:', event)
    let that = this;
    let value = event.detail.value;
    let index = event.target.dataset.index;
    let nodes = that.data.nodes
    console.log('nodes,', index, nodes)

    if (value) {
      if (nodes[index]) {
        if (nodes[index][0].children[0].type == 'text') {
          nodes[index][0].children[0].text = value;
        }
      }
      that.setData({
        nodes: nodes
      })
    }
    
  },

















  onShow: function () {
    var fadeOutLeft = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease',
    })
    fadeOutLeft.translate3d("-100%", 0, 0).step();
    this.fadeOutLeft = fadeOutLeft;

    var fadeOutRight = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease',
    })
    fadeOutRight.translate3d("100%", 0, 0).step();
    this.fadeOutRight = fadeOutRight;
  },
  showMsg: function (msg) {
    var self = this;
    self.setData({
      'topTipMsg': msg,
      'showTopTips': true
    })
    setTimeout(function () {
      self.setData({
        'showTopTips': false,
        'topTipMsg': ''
      })
    }, 2000);
  },
  handPlus: function (e) {
    // 绑定增加编辑窗    
    let _order = e.target.dataset.order;
    let _blocks = this.data.blocks;
    // 依次+1
    _blocks.map(function (n, i) {
      if (n.index >= _order) {
        _blocks[i].index += 1;
      }
    })
    _blocks.push({ 'index': _order, 'value': '' });
    _blocks.sort(function (a, b) { return a.index - b.index; })
    this.setData({
      'blocks': _blocks
    })
  },
  bingContentInput: function (e) {
    // 绑定输入事件
    let _index = e.target.dataset.index;
    let _blocks = this.data.blocks;

    _blocks[_index].value = e.detail.value;
    this.setData({
      'blocks': _blocks
    })
  },
  handTitleInput: function (e) {
    this.setData({
      'title': e.detail.value
    })
  },
  bingTypeSelect: function (e) {
    // 输入类型
    let type = e.target.dataset.type;
    let blocks = this.data.blocks;
    let index = e.target.dataset.index;

    if (type == "image") {
      blocks[index].type = type;
      this._handImageUpload(index);
    } else {
      this._handTextInput(index);
    }
  },
  handBlockUp: function (e) {
    let index = e.target.dataset.index;
    let _blocks = this.data.blocks;
    // 依次+1
    if (index == 0) return;

    _blocks[index - 1].index += 1;
    _blocks[index].index -= 1;
    _blocks.sort(function (a, b) { return a.index - b.index; })
    this.setData({
      'blocks': _blocks
    })
  },
  handBlockDown: function (e) {
    let index = e.target.dataset.index;
    let _blocks = this.data.blocks;
    if (index == _blocks.length - 1) return;

    _blocks[index + 1].index -= 1;
    _blocks[index].index += 1;
    _blocks.sort(function (a, b) { return a.index - b.index; })
    this.setData({
      'blocks': _blocks
    })
  },
  handBlockClose: function (e) {
    let index = e.target.dataset.index;
    let _blocks = this.data.blocks;
    let self = this;
    if (index == 0 && _blocks.length == 1) return;

    wx.showModal({
      title: '确定要删除此段落吗？',
      success: function (res) {
        if (res.confirm) {
          _blocks.splice(index, 1);

          // 更新排序
          _blocks.map(function (n, i) {
            n.index = i
          })
          self.setData({
            'blocks': _blocks
          })
        }
      }
    });
  },
  _handTextInput: function (index) {
    let blocks = this.data.blocks;

    blocks[index].fadeOutLeft = this.fadeOutLeft
    blocks[index].fadeOutRight = this.fadeOutRight

    this.setData({ 'blocks': blocks })
    setTimeout(function () {
      blocks[index].type = "text";
      this.setData({
        'blocks': blocks
      })
    }.bind(this), 250)
  },
  _handImageUpload: function (index) {
    let blocks = this.data.blocks;
    let self = this;

    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;

        blocks[index].value = tempFilePaths;
        self.setData({
          'blocks': blocks
        })
      }
    })
  },
  // handTagTap: function(e){
  //   let _tags = this.data.tags;
  //   let _index = e.target.dataset.index;

  //   _tags[_index].actived = _tags[_index].actived?false:true;
  //   this.setData({
  //     'tags': _tags
  //   })
  // },
  formSubmit: function (e) {
    let tags = '', areas = this.data.form.area_id, contents = [];
    let form = this.data.form;
    let self = this;

    if (this.data.blocks[0].value.length < 1) {
      this.showMsg('请写些内容吧');
      return;
    }

    // this.data.tags.map(function(n, i){
    //   if(n.actived){
    //     tags += n.id+'|';
    //   }
    // })
    // form.tags = tags.slice(0, tags.length-1);
    //改造content的传递方式，从原来的构造一个dom结构，变成传递数据
    this.data.blocks.map(function (n, i) {
      contents.push({ 'type': n.type, 'src': n.value })
    })
    form.content = JSON.stringify(contents);

    console.log(form);
  },
})


// nodes_: [{
//   name: 'div',
//   attrs: {
//     class: 'div_class',
//     style: 'line-height: 60px; color: red;'
//   },
//   children: [{
//     type: 'text',
//     text: 'Hello&nbsp;World!',
//   }]
// },
// {
//   name: 'div',
//   attrs: {
//     class: 'div_class',
//     style: 'line-height: 60px; color: blue;'
//   },
//   children: [{
//     type: 'text',
//     text: 'Hello&nbsp;World!',
//   }]
// },
// {
//   name: 'blockquote',
//   attrs: {
//     class: 'url',
//     style: 'color: pink;background: #efefef; padding: 15px 5px; border-left:3px solid #CCC;'
//   },
//   children: [{
//     type: 'text',
//     text: 'baidu.com<a href="">baidu.com</a>',
//   }]
// }
//   ,
// {
//   name: 'br',
//   attrs: {
//     class: 'url',
//     style: ''
//   }
// }

//   ,
// {
//   name: 'code',
//   attrs: {
//     class: 'url',
//     style: 'color: pink;background: #efefef; padding: 5px 5px; border-left:3px solid #CCC;'
//   },
//   children: [{
//     type: 'text',
//     text: `CODE:ss `
//   }, {
//     type: 'br',
//     text: ''
//   }, {
//     type: 'text',
//     text: ` 
//            line-height: 60px; 
//            color: pink;
//            background: #efefef; 
//            padding: 5px 5px; 
//            border-left:3px solid #CCC`
//   }]
// }

//   ,
// {
//   name: 'br',
//   attrs: {
//     class: 'url',
//     style: ''
//   }
// }
//   ,
// {
//   name: 'br',
//   attrs: {
//     class: 'url',
//     style: ''
//   }
// }

//   ,
// {
//   name: 'hr',
//   attrs: {
//     class: 'url',
//     style: ''
//   }
// }

//   ,
// {
//   name: 'br',
//   attrs: {
//     class: 'url',
//     style: ''
//   }
// }
//   ,
// {
//   name: 'br',
//   attrs: {
//     class: 'url',
//     style: ''
//   }
// }

//   ,
// {
//   name: 'i',
//   attrs: {
//     class: 'url',
//     style: 'color: pink;background: #efefef; padding: 5px 5px; border-left:3px solid #CCC;'
//   },
//   children: [{
//     type: 'text',
//     text: `i:这是斜体线`,
//   }]
// },

// {
//   name: 'strong',
//   attrs: {
//     class: 'url',
//     style: 'color: pink;background: #efefef; padding: 5px 5px; border-left:3px solid #CCC;'
//   },
//   children: [{
//     type: 'text',
//     text: `strong:这是斜体线`,
//   }]
// },

// {
//   name: 'del',
//   attrs: {
//     class: 'url',
//     style: 'color: pink;background: #efefef; padding: 5px 5px; border-left:3px solid #CCC;'
//   },
//   children: [{
//     type: 'text',
//     text: `del:这是删除线`,
//   }]
// }


// ],

//   nodes2: [{
//     name: 'img',
//     attrs: {
//       src: "http://mat1.gtimg.com/xian/dcls2017/icon-down.png",
//       class: 'url',
//       style: 'display:block; margin-top:10px; color: pink;background: #efefef; padding: 5px 5px; border-left:3px solid #CCC;'
//     },
//     children: [{
//       type: 'text',
//       text: `del:这是删除线`,
//     }]
//   }],
