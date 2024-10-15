// ==UserScript==
// @name         twitch去广告
// @namespace    http://akiyamamio.online/twitch去广告
// @version      0.0.1
// @description  尝试拦截直播过程中的弹出广告请求,不确定有没有效果,如果你知道具体的广告接口,请告诉我
// @author       alive
// @match        https://*.twitch.tv/*
// @icon         https://assets.twitch.tv/assets/favicon-32-e29e246c157142c94346.png
// @license      MIT
// @grant        none
// ==/UserScript==

//Immediately invoked function expression
//立即执行函数表达式
(function () {
    // 启用严格模式
    'use strict';

    // 定义要拦截的正则表达式列表
    const blockedPatterns = [
        new RegExp(".*://assets.twitch.tv/.*"),
        /^https?:\/\/.*\.amazon-adsystem\.com\//,   // 匹配 aax-fe.amazon-adsystem.com 下的所有请求
        /^https?:\/\/api\.twitch\.ap-northeast-1\.prod\.paets\.advertising\.amazon\.dev\//,   // 匹配 Twitch 广告 API 下的所有请求
        /^https?:\/\/.*\.media-amazon\.com\//,    // 匹配 m.media-amazon.com 下的所有请求
        /^https?:\/\/.*\.amazon-adsystem\.com\//,  // 匹配 ts.amazon-adsystem.com 下的所有请求
        /^https?:\/\/.*\.ads\.twitch\.tv\//    // 匹配 ads.twitch.tv 下的所有请求
    ];

    // 保存原始的 XMLHttpRequest.open 方法
    const originalXhrOpen = XMLHttpRequest.prototype.open;

    // 重写 XMLHttpRequest.open 方法
    XMLHttpRequest.prototype.open = function (method, url) {
        // 检查 URL 是否匹配任何一个需要拦截的正则表达式
        if (blockedPatterns.some(pattern => pattern.test(url))) {
            console.log('Blocked XMLHttpRequest to:', url);
            return; // 阻止请求，不调用原始的 open 方法
        }

        // 对不需要拦截的请求，调用原始的 open 方法
        return originalXhrOpen.apply(this, arguments);
    };

    // 保存原始的 fetch 方法
    const originalFetch = window.fetch;

    // 重写 fetch 方法
    window.fetch = function () {
        const url = arguments[0];
        // 检查 URL 是否匹配任何一个需要拦截的正则表达式
        if (blockedPatterns.some(pattern => pattern.test(url))) {
            console.log('Blocked fetch request to:', url);
            return Promise.reject('Blocked by Tampermonkey Script');
        }
        return originalFetch.apply(this, arguments);
    };
    const blockedPatternsScript = [
        new RegExp(".*://assets.twitch.tv/.*")
    ];

    // 创建 MutationObserver 监控 DOM 变化
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.tagName === 'SCRIPT' && node.src) {
                        // 检查脚本的 src 是否匹配拦截模式
                        if (blockedPatternsScript.some(pattern => pattern.test(node.src))) {
                            console.log('Blocked script:', node.src);
                            // 阻止脚本加载
                            node.remove();
                        }
                    }
                });
            }
        }
    });

    // 观察整个文档的子节点变化
    observer.observe(document.documentElement, { childList: true, subtree: true });
})();





