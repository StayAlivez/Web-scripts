// Config对象
function Config(configName, url, adSelectorMap) {
    this.configName = configName;
    this.url = url;
    this.adSelectorMap = adSelectorMap;
    this.getADSelector = function () {
        let adSelectorArray = []; // 使用数组存储键
        this.adSelectorMap.forEach((value, key, map) => {
            adSelectorArray.push(value); // 将键放入数组中
        });
        return adSelectorArray.join(",");
    };
}

// 动态创建Config的函数，根据当前URL匹配并创建
function createConfigIfMatch(configName, urlPattern, adSelectorMap) {
    const currentUrl = window.location.href; // 获取当前页面的URL
    const pattern = new RegExp(urlPattern); // 创建正则表达式

    // 判断当前URL是否匹配指定的URL模式
    if (pattern.test(currentUrl)) {
        // 返回Config对象时要传递三个参数
        return new Config(configName, urlPattern, adSelectorMap);
    }
    return null; // 如果不匹配则返回null
}

// 动态创建多个配置对象
const configs = [
    createConfigIfMatch(
        "LOL_Config",
        ".*://www.op.gg/.*",
        new Map([
            ["移动视屏", "#opgg-video"],
            ["侧边视频", "#primisPlayerContainerDiv"],
            ["中部横幅", "#banner-container"],
            ["顶部横幅", "#opgg-kit-house-image-banner"],
            ["英雄数据及个人资料-左右侧", ".vm-skin"],
            ["底部弹出", ".vm-footer"],
            ["中部横幅", ".eaw4xvd0"],
            ["游戏模式-左右侧-父类", ".eaw4xvd1"],
            ["游戏模式-左右侧", ".eaw4xvd2"],
            ["英雄数据右下", ".eaw4xvd3"],
            ["插入横幅", ".eaw4xvd4"],
            ["底部横幅", ".eaw4xvd5"],
        ])
    ),
    createConfigIfMatch(
        "TFT_Config",
        ".*://tft.op.gg/.*",
        new Map([
            ["移动视屏", "#video-meta-trend-ad"],
            ["广告0", "#video-tools-ad"],
            ["左右侧", ".css-13lit7a"],
            ["中部横幅", ".desktop"],
            ["中部横幅", ".css-1t8t0it"],
        ])
    ),
    createConfigIfMatch(
        "V_Config",
        ".*://valorant.op.gg/.*",
        new Map([
            ["移动视屏", "#video-leaderboards-ad"],
            ["广告0", "#video-stats-ad"],
            ["广告1", "#video-crosshair-ad"],
            ["广告2", "#video-agents-ad"],
            ["广告3", "#video-weapons-ad"],
            ["左右侧", ".ad"],
            ["横幅", ".ad--desktop"],
        ])
    )
].filter(config => config !== null); // 过滤掉没有匹配的配置

// 处理匹配到的第一个Config
if (configs.length > 0) {
    const matchedConfig = configs[0]; // 使用匹配到的第一个配置
    console.clear();
    console.log(matchedConfig)
    console.log("匹配到的配置:", matchedConfig.configName);
    console.log("广告选择器映射:", matchedConfig.adSelectorMap);
    let adSelector = matchedConfig.getADSelector();
    // 观察DOM并自动隐藏
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            // 监控子节点的变化
            if (mutation.type === 'childList') {
                var elements = document.querySelectorAll(adSelector);
                elements.forEach(function (element) {
                    if (element && element.style.display !== 'none') {
                        element.style.display = 'none';
                        console.log("隐藏广告:",element);
                    }
                });
            }
            // 监控属性（style）的变化
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                var element = mutation.target;
                if (element && element.matches(adSelector) && element.style.display !== 'none') {
                    element.style.display = 'none';
                    console.log("隐藏广告（style属性变化）:",element);
                }
            }
        });
    });

    // 开始观察DOM的变化，除了childList和subtree，添加attributes属性监听
    observer.observe(document.body, {
        childList: true,        // 监听子元素的添加或删除
        subtree: true,          // 监听所有子节点
        attributes: true,       // 监听属性变化
        attributeFilter: ['style'] // 只监听`style`属性的变化
    });
} else {
    console.log("没有找到匹配的配置");
}
