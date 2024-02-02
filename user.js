// ==UserScript==
// @name         隐藏知乎评论
// @version      0.0.1
// @author       wzj042
// @description  隐藏低信息量的评论，如单纯表情类评论
// @icon         https://picx.zhimg.com/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=d16d100b
// @match        *://*.zhihu.com/*
// @license      MIT
// @namespace    https://github.com/wzj042/hide-zhihu-comment
// @supportURL   https://github.com/wzj042/hide-zhihu-comment
// @homepageURL  https://github.com/wzj042/hide-zhihu-comment
// ==/UserScript==
 
(function() {
    'use strict';
    const strictBan = [
        // 严格匹配，相等即隐藏
        'mark',
        '订阅'
    ]

    const looseBan = [
        // 宽松匹配，包含关键词即隐藏
    ]

    // 最短评论长度限制，小于或等于该长度的评论将被隐藏 
    const banLenLimit = 3;

    // 数组存储对应功能开关
    let funcSwitch = {
        strictBan: true,
        looseBan: true,
        banLenLimit: true
    }


    // 注入样式
    let style_Add = document.createElement('style');
    style_Add.innerHTML = ``;
    if (document.head) {
        document.head.appendChild(style_Add);
    } else {
        let timer = setInterval(function(){
            if (document.head) {
                document.head.appendChild(style_Add);
                clearInterval(timer);
            }
        });
    }
    // 定时检查当前展开评论列表
    let timer = setInterval(function(){
        let curCommentList = document.querySelectorAll('.CommentContent');
        // 如果内容纯粹为img标签
        for (let i = 0; i < curCommentList.length; i++) {
            let curComment = curCommentList[i];
            let commentDiv = curComment.parentElement.parentElement.parentElement;
            if (curComment.querySelector('img') && !curComment.querySelector('p')) {
                commentDiv.style.display = 'none';
            }
            
            let text = curComment.innerText;
            // 获取文本内容，匹配筛选关键词
            if (funcSwitch.strictBan) {
                for (let j = 0; j < strictBan.length; j++) {
                    if (text === strictBan[j]) {
                        commentDiv.style.display = 'none';
                    }
                }
            }
            if (funcSwitch.looseBan) {
                for (let j = 0; j < looseBan.length; j++) {
                    if (text.indexOf(looseBan[j]) !== -1) {
                        commentDiv.style.display = 'none';
                    }
                }
            }
            

            if (funcSwitch.banLenLimit && text.length <= banLenLimit) {
                commentDiv.style.display = 'none';
            }

            
        }
    }, 1000);
})();