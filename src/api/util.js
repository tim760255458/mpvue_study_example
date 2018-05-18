export default params => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success: resolve,
      fail: reject
    })
  })
}
