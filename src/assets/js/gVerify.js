const createLetterArr = Symbol('createLetterArr');
const createRandomNum = Symbol('createRandomNum');
const createRandomColor = Symbol('createRandomColor');
class GVerify {
    constructor(options) {
        this.version = '1.0.0.0';
        this.options = {
            id: '', // 容器Id
            canvasId: 'verifyCanvas', // canvas的ID
            width: '100', // 默认canvas宽度
            height: '30', // 默认canvas高度
            type: 'blend', // 图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
            length: 5,
            code: ''
        };
        if (Object.prototype.toString.call(options) === '[object Object]') {
            for (let key in options) {
                this.options[key] = options[key];
            }
        } else {
            this.options.id = options;
        }

        this.options.numArr = '0,1,2,3,4,5,6,7,8,9'.split(',');
        this.options.letterArr = this[createLetterArr]();

        this.init();
        this.refresh();
    }
    /** 初始化方法 */
    init() {
        const { options: { id, canvasId } } = this;

        let ele = document.getElementById(id);
        let canvas = document.createElement('canvas');

        this.options.width = ele.offsetWidth > 0 ? ele.offsetWidth : 100;
        this.options.height = ele.offsetHeight > 0 ? ele.offsetHeight : 30;

        canvas.id = canvasId;
        canvas.width = this.options.width;
        canvas.height = this.options.height;
        canvas.style.cursor = 'pointer';
        canvas.innerHTML = '您的浏览器版本不支持canvas';

        ele.appendChild(canvas);

        canvas.onclick = () => {
            this.refresh();
        };
    }
    /** 生成（刷新）验证码 */
    refresh() {
        const { options: { canvasId, width, height, type, numArr, letterArr, length } } = this;
        this.options.code = '';
        let canvas = document.getElementById(canvasId);
        let ctx = null;
        if (canvas.getContext) {
            ctx = canvas.getContext('2d');
        } else {
            return false;
        }
        ctx.textBaseline = 'middle';

        ctx.fillStyle = this[createRandomColor](180, 240);
        ctx.fillRect(0, 0, width, height);

        let txtArr = '';
        // 判断验证码类型
        switch (type) {
            case 'number': txtArr = numArr; break;
            case 'letter': txtArr = letterArr; break;
            default: txtArr = numArr.concat(letterArr);
        }
        /** 绘制验证码 */
        for (let i = 0; i < length; i++) {
            let txt = txtArr[this[createRandomNum](0, txtArr.length)];
            this.options.code += txt;
            ctx.font = this[createRandomNum](height / 1.5, height) + 'px SimHei'; // 随机生成字体大小
            ctx.fillStyle = this[createRandomColor](50, 160); // 随机生成字体颜色
            ctx.shadowOffsetX = this[createRandomNum](-3, 3);
            ctx.shadowOffsetY = this[createRandomNum](-3, 3);
            ctx.shadowBlur = this[createRandomNum](-3, 3);
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';

            let x = width / 5 * i;
            let y = height / 2;
            let deg = this[createRandomNum](-30, 30);
            /** 设置旋转角度和坐标原点 **/
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, 0, 0);
            /** 恢复旋转角度和坐标原点 **/
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        }
        /** 绘制干扰线 **/
        for (let i = 0; i < length - 1; i++) {
            ctx.strokeStyle = this[createRandomColor](40, 180);
            ctx.beginPath();
            ctx.moveTo(this[createRandomNum](0, width), this[createRandomNum](0, height));
            ctx.lineTo(this[createRandomNum](0, width), this[createRandomNum](0, height));
            ctx.stroke();
        }
        /** 绘制干扰点 **/
        for (let i = 0; i < width / 4; i++) {
            ctx.fillStyle = this[createRandomColor](0, 255);
            ctx.beginPath();
            ctx.arc(this[createRandomNum](0, width), this[createRandomNum](0, height), 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    /** 验证验证码 **/
    validate(validCode) {
        let { options: { code } } = this;
        validCode = validCode.toLowerCase();
        let vCode = code.toLowerCase();
        if (validCode === vCode) {
            return true;
        } else {
            this.refresh();
            return false;
        }
    }
    /** 生成字母数组 **/
    [createLetterArr]() {
        let letterStr = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9';
        return letterStr.split(',');
    }
    /** 生成一个随机数 **/
    [createRandomNum](min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    /** 生成一个随机色 **/
    [createRandomColor](min, max) {
        let r = this[createRandomNum](min, max);
        let g = this[createRandomNum](min, max);
        let b = this[createRandomNum](min, max);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}

export default GVerify;
