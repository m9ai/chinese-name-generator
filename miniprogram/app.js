App({
  onLaunch: function () {
    // 小程序初始化
    console.log('Chinese Name Generator 小程序启动');
    
    // 检查用户登录状态
    wx.checkSession({
      success: () => {
        // session 未过期
        console.log('session 有效');
      },
      fail: () => {
        // session 已过期，需要重新登录
        console.log('session 过期');
      }
    });
  },
  
  globalData: {
    userInfo: null,
    generatedNames: null
  }
})