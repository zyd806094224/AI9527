// index.js
const config = require("../../utils/config");
Page({
    data: {
        imageUrl: '',
        isLoading: true,
        prompt: ''
    },
    bindTextAreaBlur(e) {
        this.setData({
            prompt: e.detail.value
        })
        console.log(this.data.prompt)
    },
    generateImg() {
        console.log('生成图片')
        // 显示半透明加载提示框
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        console.log(wx.getStorageSync('username'))
        console.log(wx.getStorageSync('key'))
        console.log(this.data.prompt)
        wx.request({
            url: `${config.httpBaseUrl}/ImageGenerate/generateAIImg`,
            method: "post",
            timeout: 60000,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                'prompt': this.data.prompt,
                'username': wx.getStorageSync('username'),
                'key': Number(wx.getStorageSync('key'))
            },
            success: ({data}) => {
                wx.hideLoading();
                console.log(data)
                if(data.code != 200){
                    wx.showToast({
                        icon: 'none',
                        title: data.message,
                        duration: 2500
                    })
                    wx.removeStorageSync('username')
                    wx.removeStorageSync('key')
                    this.setData({
                        prompt: ''
                    })
                    wx.redirectTo({
                        url: '/pages/login/login',
                    })
                    return;
                }
                this.setData({
                    imageUrl: data.data
                })
            },
            fail: ({error}) => {
                console.log(error)
                wx.showToast({
                  title: error
                })
                wx.hideLoading();
            }
        })
    },
    onPullDownRefresh() {

    },

    onShow() {

    }
})