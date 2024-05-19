// index.js
Page({

    testClick() {
        console.log('点击了')
        wx.setStorageSync('username', 'test')
        wx.connectSocket({
            url: 'ws://192.168.1.8:80/chatWebSocket/' + wx.getStorageSync('username')
        })
        wx.onSocketOpen((res) => {
            // socketOpen = true
            console.log("打开socket");
            wx.showToast({
                icon: 'none',
                title: '会话建立成功',
                duration: 500
            })
            // socketMsgQueue = []
            wx.onSocketMessage((result) => {
                result.data = result.data.replace(" ", "&nbsp;");
                console.log(result.data);
            })
        })

    },
    onPullDownRefresh() {
        console.log('=======')
    },

    onShow() {

    }
})