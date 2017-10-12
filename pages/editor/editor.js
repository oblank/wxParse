
Page({

  data: {
    nodes: [
      {
        name: 'p',
        placeholder: '请输入文本内容',
        value: ''
      },
      {
        name: 'img',
        placeholder: 'http://mat1.gtimg.com/xian/dcls2017/icon-down.png',
        value: ''
      }
    ],
    node_active: 0,
    editorHeight: 300
  },

  onLoad() {
    console.log('onload')
    let that = this

    this._setEditorHeight(that);
  },

  _setEditorHeight: function (that) {
    // 计算侧边导航高度
    wx.getSystemInfo({
      success: function (res) {
        let editorHeight = res.windowHeight - 70
        that.editorHeight = editorHeight
        that.setData({ editorHeight: editorHeight })
        console.log('editorHeight', editorHeight)
      }
    })
  },

  // bindTextAreaBlur: function (e) {
  //   console.log(e.detail.value)
  //   this._setEditorHeight(this);
  // },

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
        nodes.push({
          name: tag.toLowerCase(),
          placeholder: '请输入标题',
          value: ''
        })
        break;
      }

      // pargraph
      case 'P': {
        nodes.push({
          name: tag.toLowerCase(),
          placeholder: '请输入文本内容',
          value: ''
        })
        break;
      }

      // pargraph
      case 'BLOCKQUOTE': {
        nodes.push({
          name: tag.toLowerCase(),
          placeholder: '请输入引用内容',
          value: ''
        })
        break;
      }

      // image
      case 'IMG': {
        nodes.push({
          name: tag.toLowerCase(),
          placeholder: "http://mat1.gtimg.com/xian/dcls2017/icon-down.png",
          value: ''
        })
        break;
      }

      default:
        console.log('no icon logic matched')
    };

    nodes = this._toggleNodeActive(nodes, nodes.length - 1);
    console.log('nodes', nodes);
    that.setData({
      nodes: nodes,
      node_active: nodes.length - 1
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
    let data = {};
    if (value) {
      if (nodes[index]) {
        nodes[index].value = value;
      }
    }

    data.nodes = this._toggleNodeActive(nodes, nodes.length - 1);
    data.node_acitve = index
    console.log('textareaInput', data);
    that.setData(data)
  },

  // textarea 失去焦点时赋值给rich-text
  textareaBlur(event) {
    let that = this;
    let nodes = that.data.nodes;
    nodes = this._toggleNodeActive(nodes, -1);
    that.setData({
      nodes: nodes,
      node_active: -1
    })
  },

  // textarea 失去焦点时赋值给rich-text
  inputFocus(event) {
    let that = this;
    let nodes = that.data.nodes;
    nodes = this._toggleNodeActive(nodes, event.target.dataset.index);
    that.setData({
      nodes: nodes,
      node_active: event.target.dataset.index
    })
  },

  _toggleNodeActive: function (nodes, index) {
    let i = 0;
    nodes.map((item) => {
      if (i == index) {
        item.isActive = 'active';
      } else {
        item.isActive = 'not_active';
      }
      i++;
      return item;
    })

    return nodes;
  },

  handBlockUp: function (e) {
    let index = e.target.dataset.index;
    let nodes = this.data.nodes;
    // 依次+1
    if (index == 0) return;

    let tmp = nodes[index];
    nodes[index] = nodes[index - 1];
    nodes[index - 1] = tmp;
    let i = 0
    nodes.map((item) => {
      if (i == index - 1) {
        item.isFocus = "true";
      } else {
        item.isFocus = "false";
      }
    })
    this.setData({
      nodes: nodes,
      node_active: index - 1
    })
  },

  handBlockDown: function (e) {
    let index = e.target.dataset.index;
    let nodes = this.data.nodes;
    // 依次+1
    if (index == nodes.length) return;

    console.log('nodes1,', nodes)
    let tmp = nodes[index];
    nodes[index] = nodes[index + 1];
    nodes[index + 1] = tmp;
    let i = 0
    nodes.map((item) => {
      if (i == index + 1) {
        item.isFocus = "true";
      } else {
        item.isFocus = "false";
      }
    })
    console.log('nodes2,', nodes)

    this.setData({
      nodes: nodes,
      node_active: index + 1
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

