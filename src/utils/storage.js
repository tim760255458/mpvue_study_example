export function setStorage (key, data) {
  try {
    wx.setStorageSync(key, data)
    return true
  } catch (error) {
    return false
  }
}

export function getStorage (key) {
  try {
    const value = wx.getStorageSync(key)
    if (value) {
      return value
    }
  } catch (e) {
    return false
  }
}
