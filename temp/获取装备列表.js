// ==UserScript==
// @name         获取lol装备列表
// @namespace    333
// @version      0.0.1
// @description  333
// @author       alive
// @match        https://101.qq.com/#/equipment
// @icon
// @license      MIT
// @grant        none
// ==/UserScript==
console.clear();
console.log(33)


// 延迟 2 秒（2000 毫秒）执行
setTimeout(() => {
    console.log("This happens immediately after 'Before delay'");

// 获取元素的文本内容
    let elementNodeListOf = document.querySelectorAll('.prop-name');
    let content = '';

    elementNodeListOf.forEach(element => {
        content += element.textContent + '\n';  // 将每个元素的文本内容加入
    });

// 创建 Blob 对象
    let blob = new Blob([content], { type: 'text/plain' });

// 创建下载链接
    let link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = '装备列表.txt';  // 下载文件名

// 添加链接到文档并触发点击下载
    document.body.appendChild(link);
    link.click();

// 移除链接
    document.body.removeChild(link);
}, 5000);



