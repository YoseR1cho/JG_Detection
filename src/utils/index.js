import {uploadKnowledgePic} from "@/utils/api.js";

const transformImage = (data,name)=>{
    let url = window.URL.createObjectURL(new Blob([data]));
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", name );
    document.body.appendChild(link);
    link.click();
}

// 第一个参数是需要进行防抖处理的函数，第二个参数是延迟时间，默认为1秒钟
function debounce(fn, delay = 1000) {
// 实现防抖函数的核心是使用setTimeout
    // time变量用于保存setTimeout返回的Id

    let time = null

    // 将回调接收的参数保存到args数组中
    function _debounce(...args) {
        // 如果time不为0，也就是说有定时器存在，将该定时器清除
        if (time !== null) {
            clearTimeout(time)
        }

        time = setTimeout(() => {
            // 使用apply改变fn的this，同时将参数传递给fn
            fn.apply(this, args)
        }, delay)
    }

    // 防抖函数会返回另一个函数，该函数才是真正被调用的函数
    return _debounce
}

// interval 间隔时间，也就是cd的长短
function throttle(fn, interval=1000) {
    //该变量用于记录上一次函数的执行事件
    let lastTime = 0

    const _throttle = function(...args) {
        // 获取当前时间
        const nowTime = new Date().getTime()

        // cd剩余时间
        const remainTime = nowTime - lastTime
        // 如果剩余时间大于间隔时间，也就是说可以再次执行函数
        if (remainTime - interval >= 0) {
            fn.apply(this, args)
            // 将上一次函数执行的时间设置为nowTime，这样下次才能重新进入cd
            lastTime = nowTime
        }
    }
    // 返回_throttle函数
    return _throttle
}

const menuKeyAndLaber = (lists) => {
    //首先进行深拷贝
    const list = JSON.parse(JSON.stringify(lists))
    let newObj = {}
    const degui = (list) => {
        //先遍历数组
        list.forEach(item => {
            //遍历数组项的对象
            for (const key in item) {
                //将需要的值添加到新对象中
                if (key === "key") newObj[item.key] = item.label
                //如果有子项,需要用到递归
                if (key === 'children') degui(item[key])
            }
        });
    }
    //调用一下递归函数
    degui(list)
    //返回新数组
    return newObj
}

export const normFile = (e=>{
    if(Array.isArray(e)){
        return e
    }
    return e && e.fileList;
})

export const picHandler = (originalPic)=>{
    let fileObj = originalPic.originFileObj ? originalPic.originFileObj : originalPic
    const form = new FormData();
    form.append('file',fileObj);

    return uploadKnowledgePic(form)
}


export {
    throttle,
    debounce,
    transformImage,
    menuKeyAndLaber
}
