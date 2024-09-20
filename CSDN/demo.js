// 获取codes
let codes = document.querySelectorAll("code")

// 循环遍历
codes.forEach(c => {
    // 设置代码块可编辑
    c.contentEditable = "true";
});

