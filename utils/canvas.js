/**
 * @file createCanvas.js
 * @author lixiaohu
 */

 //创建canvas上下文环境
 console.log(33333333333333333333)
 export default function(id, options, socket) {
     console.log(24234234234234234)
    var self = this;
    var pointCollection = []
    this.canvas = document.getElementById(id);
    var obj = {
      canvas: this.canvas,
      context: this.canvas.getContext("2d"),
      isWrite: false, //是否开始
      lastWriteTime: -1,
      lastWriteSpeed: 0,
      lastWriteWidth: 0,
      canvasWidth: 100, //canvas宽高
      canvasHeight: 100,
      isShowBorder: true, //是否显示网格
      bgColor: 'green', //背景色
      borderWidth: 2, // 网格线宽度
      borderColor: "#fff", //网格颜色
      lastPoint: {}, //
      writeWidth: 50, //基础轨迹宽度
      maxWriteWidth: 100, // 写字模式最大线宽
      minWriteWidth: 100, // 写字模式最小线宽
      writeColor: '#000', // 轨迹颜色
      isWriteName: false //签名模式
    }

    for (var name in options) {
      obj[name] = options[name];
    }

    // this.sendPos = function() {
    //     const timer = setTimeout(() => {
    //         const len = pointCollection.length
    //         if (len !== 0) {
    //             socket.send(JSON.stringify(pointCollection))
    //             pointCollection.length = 0
    //         }
    //         clearTimeout(timer)
    //         this.sendPos()
    //     }, 300)
    // }

    // this.sendPos()
    /**
     * 轨迹宽度
     */
    this.setLineWidth = function () {
      var nowTime = new Date().getTime();
      var diffTime = nowTime - obj.lastWriteTime;
      obj.lastWriteTime = nowTime;
      var returnNum = obj.minWriteWidth + (obj.maxWriteWidth - obj.minWriteWidth) * diffTime / 30;
      if (returnNum < obj.minWriteWidth) {
        returnNum = obj.minWriteWidth;
      } else if (returnNum > obj.maxWriteWidth) {
        returnNum = obj.maxWriteWidth;
      }

      returnNum = returnNum.toFixed(2);
//写字模式和签名模式
      if (obj.isWriteName) {
        obj.context.lineWidth = obj.writeWidth
      } else {
        obj.context.lineWidth = obj.lastWriteWidth = obj.lastWriteWidth / 4 * 3 + returnNum / 4;
      }
    }

    /**
     * 绘制轨迹
     */
    this.writing = function (point, isLastPoint) {

        if (undefined === obj.lastPoint.x || undefined === obj.lastPoint.y) {
            this.writeBegin(point)
            return
        }
        obj.context.beginPath();
        obj.context.moveTo(obj.lastPoint.x, obj.lastPoint.y);
        obj.context.lineTo(point.x, point.y);
        self.setLineWidth();
        obj.context.stroke();
        if (isLastPoint) {
            obj.lastPoint = {}
            this.writeEnd()
        }else {
            obj.lastPoint = point;
        }
        obj.context.closePath();
    }

    /**
     * 轨迹样式
     */
    this.writeContextStyle = function () {
      obj.context.beginPath();
      obj.context.strokeStyle = obj.writeColor;
      obj.context.lineCap = 'round';
      obj.context.lineJoin = "round";
    }

    /**
     * 写开始
     */
    this.writeBegin = function (point) {
      obj.isWrite = true;
      obj.lastWriteTime = new Date().getTime();
      obj.lastPoint = point;
      self.writeContextStyle();
    }

    /**
     * 写结束
     */
    this.writeEnd = function () {
      obj.isWrite = false;
    }

    /**
     * 清空画板
     */
    this.canvasClear = function () {
      obj.context.save();
      obj.context.strokeStyle = '#fff';
      obj.context.clearRect(0, 0, obj.canvasWidth, obj.canvasHeight);
      if (obj.isShowBorder && !obj.isWriteName) {
        obj.context.beginPath();
        var size = obj.borderWidth / 2;
//画外面的框
        obj.context.moveTo(size, size);
        obj.context.lineTo(obj.canvasWidth - size, size);
        obj.context.lineTo(obj.canvasWidth - size, obj.canvasHeight - size);
        obj.context.lineTo(size, obj.canvasHeight - size);
        obj.context.closePath();
        obj.context.lineWidth = obj.borderWidth;
        obj.context.strokeStyle = obj.borderColor;
        obj.context.stroke();
//画里面的框
        obj.context.moveTo(0, 0);
        obj.context.lineTo(obj.canvasWidth, obj.canvasHeight);
        obj.context.lineTo(obj.canvasWidth, obj.canvasHeight / 2);
        obj.context.lineTo(obj.canvasWidth, obj.canvasHeight / 2);
        obj.context.lineTo(0, obj.canvasHeight / 2);
        obj.context.lineTo(0, obj.canvasHeight);
        obj.context.lineTo(obj.canvasWidth, 0);
        obj.context.lineTo(obj.canvasWidth / 2, 0);
        obj.context.lineTo(obj.canvasWidth / 2, obj.canvasHeight);
        obj.context.stroke();

      }
      obj.context.restore();
    }

    /**
     * 保存图片 格式base64
     */
    this.saveAsImg = function () {
      var image = new Image();
      image.src = this.canvas.toDataURL("image/png");
      if (image.src == this.emptyCanvas) {
        alert('请先书写')
      } else {
        console.log('提交的内容===>', image.src)
      }
    };

    /**
     * 初始化画板
     */
    this.canvasInit = function () {
      this.canvas.width = obj.canvasWidth;
      this.canvas.height = obj.canvasHeight;
      this.emptyCanvas = this.canvas.toDataURL("image/png");
    }

    /**======================事件绑定===========================**/

    this.canvas.addEventListener('mousedown', function (e) {
      var point = {
        x: e.offsetX || e.clientX,
        y: e.offsetY || e.clientY
      };
      self.writeBegin(point);
    });

    this.canvas.addEventListener('mouseup', function (e) {
      var point = {
        x: e.offsetX,
        y: e.offsetY
      };
      self.writeEnd(point);
    });

    this.canvas.addEventListener('mouseleave', function (e) {
      var point = {
        x: e.offsetX,
        y: e.offsetY
      };
      self.writeEnd(point);
    });

    this.canvas.addEventListener('mousemove', function (e) {
      if (obj.isWrite) {
        var point = {
          x: e.offsetX,
          y: e.offsetY
        };

        self.writing(point);
      }
    });

//移动端
    this.canvas.addEventListener('touchstart', function (e) {
      var touch = e.targetTouches[0];
      var point = {
        x: touch.pageX || touch.clientX,
        y: touch.pageY || touch.clientY
      };
      pointCollection.push(point)
      self.writeBegin(point);
    });
    this.canvas.addEventListener('touchend', function (e) {
      var touch = e.changedTouches[0];
      var point = {
        x: touch.pageX,
        y: touch.pageY
      };
      socket.send(JSON.stringify(pointCollection))
      pointCollection = []
      self.writeEnd(point);
    });
    this.canvas.addEventListener('touchmove', function (e) {
      var touch = e.targetTouches[0];
      var point = {
        x: touch.pageX,
        y: touch.pageY
      };
      self.writeEnd(point);
    });
    this.canvas.addEventListener('touchmove', function (e) {
      var touch = e.targetTouches[0];
      var point = {
        x: touch.pageX,
        y: touch.pageY
      };


      pointCollection.push(point)
      self.writing(point);
    });

    this.canvasInit();
    this.canvasClear();

    this.option = obj;
    obj.control = {
      clearCanvas: self.canvasClear
    };
 }