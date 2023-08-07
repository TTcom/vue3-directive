export const registerDirective = (app) => {
    // 用于用户点击键盘确定按钮时未失去焦点问题，失去焦点关闭键盘
    app.directive('vinput', {
        mounted(el) {
            el.addEventListener('keypress', (e) => {
                if (e.keyCode === 13) {
                    document.activeElement.blur()
                }
            })
        },
    })
    // 用于用户在移动端点击清空按钮时输入框失去焦点关闭键盘问题
    app.directive('xclose', {
        mounted(el) {
            el.addEventListener('mousedown', (e) => {
                e.preventDefault()
            })
        },
    })
    // 防止用户重复点击提交按钮重复发送请求问题
    app.directive('xxhr', {
        mounted(el) {
            (function () {
                if (window.hadResetAjaxForWaiting)
                    return
                window.hadResetAjaxForWaiting = true
                window.waittingAjaxMap = {}
                const OriginXHR = window.XMLHttpRequest

                window.XMLHttpRequest = function () {

                    const realXHR = new OriginXHR() // 重置操作函数，获取请求数据
                    // 客户端开始发出请求
                    realXHR.addEventListener('loadstart', () => {
                        window.xhrDomList.forEach((val) => {
                            if (val.nodeName === 'BUTTON')
                                val.disabled = true
                            else
                                val.style.pointerEvents = 'none'
                        })
                    }, false)
                    // 监听加载完成，清除 waiting
                    realXHR.addEventListener('loadend', () => {
                        window.xhrDomList.forEach((val) => {
                            if (val.nodeName === 'BUTTON')
                                val.disabled = false
                            else
                                val.style.pointerEvents = 'auto'
                        })
                    }, false)
                    return realXHR
                }
            })()
            if (!window.xhrDomList)
                window.xhrDomList = []
            window.xhrDomList.push(el)
        },
    })
}
