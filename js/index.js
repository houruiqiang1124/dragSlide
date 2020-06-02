class Drag {
    //ele为传入的DOM对象
    constructor(ele) {
            //初始化参数
        this.ele = ele;
        ['strX', 'strY', 'strL', 'strT', 'curL', 'curT'].forEach(item => {
            this[item] = null;
        });
        
        //为按下鼠标绑定事件,事件函数一定要绑定this,在封装过程中this统一指定为实例对象，下不赘述
        this.DOWN = this.down.bind(this);
        this.ele.addEventListener('mousedown', this.DOWN);
    }
    down(ev) {
       
        let ele = this.ele;
        this.strX = ev.clientX;//鼠标点击处到浏览器窗口最左边的距离
        this.strY = ev.clientY;//鼠标点击处到浏览器窗口最上边的距离
        this.strL = ele.offsetLeft;//元素到浏览器窗口最左边的距离
        this.strT = ele.offsetTop;//元素到浏览器窗口最上边的距离

       
        this.MOVE = this.move.bind(this);
        this.UP = this.up.bind(this);
        document.addEventListener('mousemove', this.MOVE);
        document.addEventListener('mouseup', this.UP);
    }
    move(ev) {
        let ele = this.ele;
        this.curL = ev.clientX - this.strX + this.strL;
        this.curT = ev.clientY - this.strY + this.strT;
        ele.style.left = this.curL + 'px';
        ele.style.top = this.curT + 'px';
    }
    up(ev) {
        //给前两个事件解绑
        document.removeEventListener('mousemove', this.MOVE);
        document.removeEventListener('mouseup', this.UP);
    }
}