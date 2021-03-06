
Page({

  data: {
    min_content_length: 100,
    node_active: 0,
    editorHeight: 300,
    windowWidth: 400,
    windowHeight: 600,
    nodes: [
      {
        name: 'h3',
        placeholder: '请输入小标题',
        value: ''
      },
      {
        name: 'p',
        placeholder: '请输入内容，可换行。',
        value: ''
      },
      {
        name: 'img',
        placeholder: '/image/uploader.svg',
        value: ''
      }
    ]
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
        
        let editorHeight = res.windowHeight - 75 - 70
        that.editorHeight = editorHeight
        that.setData({ 
          editorHeight: editorHeight,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
        console.log('editorHeight', editorHeight)
      }
    })
  },

  // gen node
  _genNode: function (tag) {
    switch (tag.toUpperCase()) {
      // title
      case 'H2':
      case 'H3':
      case 'H4':
      case 'H5': {
        return {
          name: tag.toLowerCase(),
          placeholder: '请输入标题',
          value: ''
        }
        break;
      }

      // pargraph
      case 'P': {
        return {
          name: tag.toLowerCase(),
          placeholder: '请输入文本内容，支持换行',
          value: ''
        }
        break;
      }

      // pargraph
      case 'BLOCKQUOTE': {
        return {
          name: tag.toLowerCase(),
          placeholder: '请输入引用内容，支持换行',
          value: ''
        }
        break;
      }

      // image
      case 'IMAGE':
      case 'IMG': {
        return {
          name: tag.toLowerCase(),
          placeholder: "/image/uploader.svg",
          value: ''
        }
        break;
      }

      // image
      case 'VIDEO': {
        return {
          name: tag.toLowerCase(),
          placeholder: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
          value: ''
        }
        break;
      }

      default: {
        console.log('no icon logic matched')
        return false
      }   
    };
  },

  // 编辑器
  tapIcon(e) {
    console.log('taped icon...', e)    
    let that = this;
    let tag = e.currentTarget.id || ''
    let nodes = that.data.nodes
    nodes.push(that._genNode(tag))
    nodes = that._toggleNodeActive(nodes, nodes.length - 1);
    console.log('nodes', nodes);
    that.setData({
      nodes: nodes,
      node_active: nodes.length - 1,
      toView: 'editor-bar'
    })
  },

  tap(event) {
    console.log('taped...', event)
  },

  tap4del(e){
    let that = this;
    let index = e.currentTarget.dataset.index || e.target.dataset.index
    that._delBlock(that, index)
  },

  longpress(e) {
    let that = this;
    let index = e.currentTarget.dataset.index || e.target.dataset.index
    that._delBlock(that, index)
  },

  _delBlock(that, index) {
    console.log('删除模块：', index);    
    wx.showModal({
      title: '确认删除该模块？',
      content: '删除后不可恢复',
      confirmText: '删除',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let nodes = that.data.nodes;
          nodes.splice(index, 1);
          that.setData({
            nodes: nodes
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  touchmove(event) {
    wx.showModal({
      title: '确认删除该模块？',
      content: '请确认是否删除',
    })
    console.log('touchmove...', event)
  }, 
  
  touchend(event) {
    console.log('touchend...', event)
  },

  // textarea 输入
  textareaInput(event) {
    // console.log('textareaInput:', event)
    // let that = this;
    // let value = event.detail.value;
    // let index = event.target.dataset.index;
    // let nodes = that.data.nodes
    // console.log('nodes,', index, nodes)
    // let data = {};
    // if (value) {
    //   if (nodes[index]) {
    //     nodes[index].value = value;
    //   }
    // }

    // data.nodes = this._toggleNodeActive(nodes, nodes.length - 1);
    // data.node_acitve = index
    // console.log('textareaInput', data);
    // that.setData(data)
  },

  // textarea 失去焦点时赋值给rich-text
  textareaBlur(event) {
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

    data.nodes = this._toggleNodeActive(nodes, -1);
    data.node_acitve = -1
    console.log('textareaBlur', data);
    that.setData(data)
  },

  // textarea 失去焦点时赋值给rich-text
  inputFocus(event) {
    let that = this;
    let nodes = that.data.nodes;
    nodes = that._toggleNodeActive(nodes, event.target.dataset.index);
    that.setData({
      nodes: nodes,
      node_active: event.target.dataset.index
    })
  },

  _toggleNodeActive: function (nodes, index) {
    let i = 0;
    console.log('_toggleNodeActive', nodes);
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

  // upload image
  uploadImage: function(e) {
    console.log('uploadImage:', e)

    let nodes = this.data.nodes;
    let that = this;
    let index = e.currentTarget.dataset.index;
    if (index === false) {
      return;
    }

    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log('tempFilePaths:', res)
        let tempFilePaths = res.tempFilePaths;
        if (!tempFilePaths.length) {
          return;
        }

        // append more nodes
        if (tempFilePaths.length > 1) {
          for(let i = 0; i < tempFilePaths.length - 1; i++) {
            nodes.splice(index + i, 0, that._genNode('IMG'))
          }
        }

        let i = 0
        tempFilePaths.map((item) => {
          wx.getImageInfo({
            src: item,
            success: function (res) {
              // todo recal width
              let showWidth = res.width;
              let showHeight = res.height;
              if (res.width > that.data.windowWidth) {
                showWidth = that.data.windowWidth - 20; //20px is padding border
                showHeight = res.height * (showWidth / res.width);
              }
              //preview
              nodes[index + i].width = showWidth;
              nodes[index + i].height = showHeight;
              //real
              nodes[index + i].real_width = res.width;
              nodes[index + i].real_height = res.height;
              nodes[index + i].value = item;

              i++              
              if (i == tempFilePaths.length) {
                that.setData({
                  nodes: nodes
                })
              }
            }
          })

        })
      }
    })
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

  genContent: function(e) {
    let that = this
    let nodes = that.data.nodes
    let html = ''
    let wx_nodes = []

    nodes.forEach((item) => {
      if (item && item.name && item.value) {
        let tag = item.name.toUpperCase() || ''    
        let tag_m = tag.toLowerCase()    
        switch (tag) {
          // title
          case 'H2':
          case 'H3':
          case 'H4':
          case 'H5': {
            html += `<${tag_m} class="${tag_m}">${item.value}</${tag_m}>`
            break;
          }

          // pargraph
          case 'P': {
            html += `<${tag_m} class="${tag_m} pargraph">${item.value}</${tag_m}>`
            break;
          }

          // pargraph
          case 'BLOCKQUOTE': {
            html += `<p class="${tag_m}">${item.value}</p>`
            break;
          }

          // image
          case 'IMAGE':
          case 'IMG': {
            // TODO upload
            html += `<br/><img class="${tag_m}" src="${item.value}" />`
            break;
          }

          // image
          case 'VIDEO': {
            html += `<br/><video class="${tag_m}" src="${item.value}" />`
            break;
          }

          default: {
            console.log('no node logic matched')
            return false
          }  
        }
      }
    })

    if (html.length < that.data.min_content_length) {
      wx.showModal({
        title: '内容太少！',
        content: '真实有效的内容才能通过系统审核',
        showCancel: false,
        confirmText: '好的'
      })
    }

    console.log('genContent:', {
      html,
      wx_nodes
    })
  }
})

