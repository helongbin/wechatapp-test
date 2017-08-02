//feedback page
Page({
    data: {
        imageList: [],
        systemInfo: {}
    },
    onReady: function () {
        let systemInfo = {};
        let networkPromise = new Promise((resolve, reject) => {
            wx.getNetworkType({
                success: (res) => {
                    systemInfo.networkType = res.networkType.toUpperCase();
                    resolve();
                }
            });
        });
        let systemPromise = new Promise((resolve, reject) => {
            wx.getSystemInfo({
                success: (res) => {
                    systemInfo.model = res.model;
                    systemInfo.system = res.system;
                    systemInfo.version = '微信' + res.version;
                    systemInfo.language = res.language === 'zh_CN' ? '简体中文' : res.language;
                    systemInfo.resolution = res.screenWidth*res.pixelRatio + '*' + res.screenHeight*res.pixelRatio;
                    resolve();
                }
            });
        });

        let allPromise = Promise.all([networkPromise, systemPromise]);
        allPromise.then(() => {
            this.setData({
                systemInfo: systemInfo
            });
        });
    },
    addImage: function() {
        wx.chooseImage({
            success: (res) => {
                let imageList = this.data.imageList;
                if (imageList.length >=3) {return ;}

                imageList.push(res.tempFiles[0]);
                this.setData({
                    imageList: imageList
                });
                console.log(res.tempFiles[0]);
            }
        });
    },
    deleteImage: function(e) {
        let curDeletedImagePath = e.target.dataset.path;
        let imageList = this.data.imageList.filter((item) => {
            return item.path !== curDeletedImagePath;
        });
        this.setData({
            imageList: imageList
        });
    }
})