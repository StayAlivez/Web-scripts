// ==UserScript==
// @name         opgg去广告
// @namespace    http://akiyamamio.online/
// @version      0.0.2
// @description  去除opgg 英雄联盟,云顶之弈,无畏契约的左侧视屏广告
// @author       alive
// @match        https://*.op.gg/*
// @icon         https://s-lol-web.op.gg/favicon.ico
// @license      MIT
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    // 启用严格模式
    'use strict';

    var LOL_IDS = [
        "#opgg-video",
        "#primisPlayerContainerDiv",
        "#banner-container",
        "#opgg-kit-house-image-banner",
        ".vm-skin",
        ".vm-footer",
        ".eaw4xvd0",
        ".eaw4xvd1",
        ".eaw4xvd2",
        ".eaw4xvd3",
        ".eaw4xvd4",
        ".eaw4xvd5"
    ];
    var TFT_IDS = [
        "#vid-container0",
        "#video-tools-ad",
        ".css-13lit7a",
        ".desktop",
        ".css-1t8t0it"
    ];
    var V_IDS = [
        "#video-leaderboards-ad",
        "#video-stas-ad",
        "#video-crosshair-ad",
        "#video-agents-ad",
        "#video-weapons-ad",
        ".ad"
    ];

    // 合并所有ID数组
    var allIDS = LOL_IDS.concat(TFT_IDS, V_IDS);

    // 拼接选择器条件
    var selector = allIDS.map(id => `${id}`).join(', ');

    // 观察DOM并自动隐藏
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            // 监控子节点的变化
            if (mutation.type === 'childList') {
                var elements = document.querySelectorAll(selector);
                elements.forEach(function (element) {
                    if (element && element.style.display !== 'none') {
                        element.style.display = 'none';
                        console.log("清除广告");
                    }
                });
            }
            // 监控属性（style）的变化
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                var element = mutation.target;
                if (element && element.matches(selector) && element.style.display !== 'none') {
                    element.style.display = 'none';
                    console.log("清除广告（style属性变化）");
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

})();





