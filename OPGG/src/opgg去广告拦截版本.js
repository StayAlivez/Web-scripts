// ==UserScript==
// @name         opgg去广告
// @namespace    http://akiyamamio.online/
// @version      0.0.4
// @description  去除opgg 英雄联盟,云顶之弈,无畏契约的左侧视屏广告
// @author       alive
// @match        *://*.op.gg/*
// @icon         https://s-lol-web.op.gg/favicon.ico
// @license      MIT
// @grant        none
// @run-at       document-end
// ==/UserScript==

//Immediately invoked function expression
//立即执行函数表达式
(function () {
    // 启用严格模式
    'use strict';
    // 定义要拦截的正则表达式列表
    const blockedPatterns = [
        new RegExp(".*://s-opgg-kit.op.gg/.*"),
        new RegExp(".*://.*.aniview.com/.*"),
        new RegExp(".*://hb.vntsm.com/.*"),
        new RegExp("https://hb.vntsm.com/ab/live/fatum/ad-manager-bundle.min.js")
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

})();





