// pages/alumni/alumni.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasAlumniInfoList: false,
    alumniInfoList: [],
    devidedAlumniInfoList: [],
    letterList:[
      "A", "B", "C", "D", "E",
      "F", "G", "H", "I", "J",
      "K", "L", "M", "N", "O",
      "P", "Q", "R", "S", "T",
      "U", "V", "W", "X", "Y", "Z"
    ],
    modalHidden:true,
    toView: "",
    hideErrorPage: true,
    hideAlumniInfoList: false,
    errorMessage:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      console.log("userInfo:"+app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // 获取alumni.json
    this.getAlumniInfoList()
    this.getAccessToken()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 从gitee上拉取alumni.json
   */
  getAlumniInfoList: function() {
    var resUrl = ""
    if(app.globalData.versionCode){
      resUrl = app.globalData.baseUrl+"alumni_"+app.globalData.versionCode+"/db/alumni.json"
    }else{
      resUrl = app.globalData.baseUrl + "alumni_0000/db/alumni.json"
    }
    wx.showLoading({
      title: 'waiting...',
    })
    wx.request({
      url: resUrl,
      success: res=>{
        wx.hideLoading()
        this.hasAlumniInfoList = true
        if(res.statusCode == 200){
          console.log(res.data)
          var alumniList = res.data
          alumniList.sort(this.compare("start_letter"))
          var dividedAlumniList = this.divideByLetter(alumniList)
          this.setData({
            hideErrorPage: true,
            hideAlumniInfoList: false,
            alumniInfoList: alumniList,
            dividedAlumniInfoList: dividedAlumniList
          })
        }
      },
      fail: res => {
        console.log("fail:"+res)
        wx.hideLoading()
        this.setData({
          hideErrorPage: false,
          hideAlumniInfoList: true,
          errorMessage: " ╮(๑•́ ₃•̀๑)╭点击刷新"
        })
      }
    })
  },
  /**
   * 根据姓名首字母排序
   */
  compare: function(property){
    return function(a, b){
      return a[property].charCodeAt() - b[property].charCodeAt()
    }
  },
  /**
   * 将alumni info list 按首字母分组
   */
  divideByLetter: function(infoList) {
    var dividedResult = []
    var group = {}
    for(var i=0; i<infoList.length; i++){
      var alumniInfo = infoList[i]
      //此处根据alumniInfo.start_letter分组
      if(!group[alumniInfo.start_letter]){
        dividedResult.push({
          "indexLetter": alumniInfo.start_letter,
          "data":[alumniInfo]
        })
        this.charCodeList.push(alumniInfo.start_letter.charCodeAt())
        //填充group[alumniInfo.start_letter]为一个非空的任何值,
        //下次判断时即可知已经根据了该值进行分组
        group[alumniInfo.start_letter] = "divided"
      }else{
        for(var j=0; j<dividedResult.length;j++){
          var g = dividedResult[j]
          if(alumniInfo.start_letter == g["indexLetter"]){
            g.data.push(alumniInfo)
          }
        }
      }
    }
    return dividedResult
  },
  /**
   * 首字母触摸事件
   */
  tapLetter: function(event){
    var tapped = event.target.dataset.letter
    if(tapped){
      wx.showToast({
        title: tapped,
        icon: "none",
        duration: 300,
      })
      /**
       * 首先判断有没有该字母开头的数据
       */
      while(true){
        if(this.charCodeList.some(function(e){
          return e == tapped.charCodeAt()
        })){
          break
        }else{
          //防止没有Z开头的data,导致死循环
          if(tapped.charCodeAt() == 90){
            break;
          }
          tapped = String.fromCharCode(tapped.charCodeAt() + 1)
        }
        console.log("tapped:" + tapped)
      }
      var toView = "index-"+tapped
      this.setData({
        toView:toView
      })
    }
  },
  /**
   * 显示alumni详细信息
   */
  showDetailMsg: function(event){
    console.log(event)
    var alumniId = event.currentTarget.dataset.id
    console.log(alumniId)
    var alumniInfo = this.data.alumniInfoList.find(function(alumni){
      return alumni.id == alumniId
    })
    console.log(alumniInfo)
    if(this.data.modalHidden){
      this.data.modalHidden = false;
      this.setData({
        modalHidden:this.data.modalHidden
      })
    }
  },
  /**
   * 隐藏alumni detail modal
   */
  hideModal: function(){
    if(!this.data.modalHidden){
      this.data.modalHidden = true;
      this.setData({
        modalHidden: this.data.modalHidden
      })
    }
  },
  throwTapEvent: function(){
    /**
     * 截获tap事件，只有点击到modal旁边的阴影区时才隐藏
     */
  },
  /**
   * 网络请求出现问题时,尝试重新拉取数据
   */
  refresh: function(){
    this.getAlumniInfoList()
  },
  getAccessToken: function(){
    wx.request({
      url: 'https://gitee.com/oauth/token',
      method: "POST",
      header: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        grant_type: "password",
        username: "15629128667@163.com",
        password: "ypl1994",
        client_id: "c23f12e223205d29de58758ea9425828987e7768fd0449cdb46671a90a493673",
        client_secret: "06fd3836b608c2d9229c020ec49d7681cb63df80ba0b42db6ed3b30914023291",
        scope: "user_info projects pull_requests issues notes keys hook groups gists"
      },
      success: res => {
        console.log(res.data)
      }
    })
  },
  charCodeList:[],
  hasAlumniInfoList: false,
  accessToken: "e7de7f0eb942c0346ab0ceafdacfeb447f945b24b7ab30df96d53916fcaeea53"
})