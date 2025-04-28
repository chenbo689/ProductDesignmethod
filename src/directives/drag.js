const dragDirective={
    
    mounted(el,binding,vnode){
        el.addEventListener('mousedown', handleMouseStart)
        el.addEventListener('touchstart',handleTouchstart)
        el.addEventListener('touchmove',handleTouchmove)
        el.addEventListener('touchend',handleTouchend)
        let targetEl, cloneNode,zoom,height,width,anwserbox
        function handleMouseStart(e) {
            if(!anwserbox){
                anwserbox=[...document.querySelectorAll('.box')]
            }
            e.preventDefault();
            targetEl = e.currentTarget;
            //复制节点，用于移动
            cloneNode = targetEl.cloneNode(true)
            cloneNode.style.position = "absolute"
            cloneNode.style.cursor = "grabbing"
            zoom = document.querySelector('.screen').style.transform.match(/scale\(([^)]+)\)/)[1]
            //缩放，适应整体
            cloneNode.style.transform = `scale(${zoom})`
            cloneNode.classList.add('choiceItem')
            document.addEventListener("mousemove", (e) => {
                handleMouseMove(e)
            });
            cloneNode.addEventListener("mouseup", (e) => {
                handleMouseEnd(e)
            });
            //向外部容器添加该节点
            document.getElementsByClassName("screen-root")[0].append(cloneNode);
            height = cloneNode.clientHeight;
            width = cloneNode.clientWidth;
            let { clientX, clientY } = e;
            
            cloneNode.style.top = clientY - height/2 + "px";
            cloneNode.style.left = clientX - width  / 2 + "px";
        }
        function handleMouseMove(e) {
            e.preventDefault();
            if (!cloneNode) {
                return;
            }
            let { clientX, clientY } = e;
            cloneNode.style.top = clientY - height /2 + "px";
            cloneNode.style.left = clientX - width  / 2 + "px";
            //暂时隐藏,检测当前元素是否在答案范围上
            cloneNode.style.display = "none";
            let oElement = document.elementFromPoint(clientX, clientY);
            const i = document.querySelector('.item_hover')
            !i ? null : i.classList.remove('item_hover')
            if (anwserbox.includes(oElement) && ![...oElement.classList].includes("right")) {//已填和其他盒子不需要添加
                oElement.classList.add('item_hover')
            }
            //恢复显示，根据你最初的样式来，或者前面用变量保存
            cloneNode.style.display = "flex";
        }
        function handleMouseEnd(e) {
            if (!cloneNode) {
                return;
            }
            let { clientX, clientY } = e;
            //暂时隐藏
            cloneNode.style.display = "none";
            // //获取当前触摸点最顶层的元素
            let oElement = document.elementFromPoint(clientX, clientY);
            binding.value.isrightFun(cloneNode,oElement)
            document.removeEventListener("touchmove", handleMouseMove);
        }
        // 移动端兼容
        // 监听 touchstart 事件，保存被拖拽的元素和原始位置
        function handleTouchstart(event) {
            event.preventDefault()
            cloneNode = event.currentTarget.cloneNode(true);
            // 将被拖拽的元素随着手指移动
            cloneNode.style.position = 'absolute'
            zoom = document.querySelector('.screen').style.transform.match(/scale\(([^)]+)\)/)[1]
            cloneNode.style.zoom = zoom
            cloneNode.classList.add('choiceItem')
            document.getElementsByClassName("screen-root")[0].append(cloneNode)
            height = cloneNode.clientHeight;
            width = cloneNode.clientWidth;
            let { clientX, clientY } = event.changedTouches[0];
            cloneNode.style.top = clientY / zoom - height/2 + "px"
            cloneNode.style.left = clientX / zoom - width / 2 + "px"
        }
        function handleTouchmove(event) {
            if(!anwserbox){
                anwserbox=[...document.querySelectorAll('.box')]
            }
            event.preventDefault();
            // 获取触摸点的坐标
            let { clientX, clientY } = event.changedTouches[0];
            cloneNode.style.top = clientY / zoom - height/2 + "px"
            cloneNode.style.left = clientX / zoom - width / 2 + "px"

            cloneNode.style.display = "none"
            let oElement = document.elementFromPoint(clientX, clientY)
            const i = document.querySelector('.item_hover')
            !i ? null : i.classList.remove('item_hover')
            if (anwserbox.includes(oElement) && ![...oElement.classList].includes("right")) {
                oElement.classList.add('item_hover')
            }
            cloneNode.style.display = "flex"
        }
        // 监听 touchend 事件，处理放置逻辑
        function handleTouchend(event) {
            if (!cloneNode) {
                return;
            }
            let { clientX, clientY } = event.changedTouches[0];
            //暂时隐藏
            cloneNode.style.display = "none";
            // //获取当前触摸点最顶层的元素
            let oElement = document.elementFromPoint(clientX, clientY);
            binding.value.isrightFun(cloneNode,oElement)
        }
    },
    beforeUnmount(el, binding, vnode) {
        // el.removeEventListener('mousedown', handleMouseStart)
        // el.removeEventListener('touchstart', handleTouchstart)
        // el.removeEventListener('touchmove', handleTouchmove)
        // el.removeEventListener('touchend', handleTouchend)
    }
}
export default dragDirective