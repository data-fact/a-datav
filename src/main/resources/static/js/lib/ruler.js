var ruler = {
    initPlugin: function (params) {
        var initParams = {
            el: params.el,
            height: 20,
            startValue: 0,
            background: '#0e1013',
            scale: params.scale || 1,
        };

        if (!initParams.el) {
            console.warn("没有容器元素的参数");
            return false;
        }

        var rulerWrap = document.getElementById(initParams.el); //获取容器
        rulerWrap.style.height = initParams.height < 40 ? 40 + "px" : initParams.height + "px";

        let winWidth = rulerWrap.offsetWidth; //容器宽度

        let division=10; //每个刻度的距离 分割线
        let bigDivision = 100
        if(initParams.scale <= 0.4){
            bigDivision = 400
        }else if(initParams.scale > 0.4 && initParams.scale <= 0.8){
            bigDivision = 200
        }else if(initParams.scale > 0.8 && initParams.scale <= 1.2){
            bigDivision = 100
        }else if(initParams.scale > 1.2 && initParams.scale <= 1.5){
            bigDivision = 80
        }else{
            bigDivision = 40
        }
        division = bigDivision * initParams.scale / 10

        var canvas = rulerWrap.getElementsByTagName("canvas")[0]; //获取容器下的canvas标签
        //没有canvas就创建一个
        if (!canvas) {
            canvas = document.createElement("canvas"); //创建canvas标签
            rulerWrap.appendChild(canvas);
        }
        canvas.width = winWidth;
        canvas.height = initParams.height;
        var cxt = canvas.getContext("2d");

        //画刻度尺
        function drawRuler() {
            //清空画布
            cxt.clearRect(0, 0, winWidth, initParams.height);

            //刻度尺背景
            if (initParams.background) {
                cxt.fillStyle = initParams.background;
                cxt.fillRect(0, 0, canvas.width, initParams.height);
            }

            //画刻度线
            for (var i = 0; i < Math.ceil(winWidth / division); i++) {
                cxt.beginPath();
                cxt.save();
                cxt.strokeStyle = initParams.color ? initParams.color : "#ccc";
                cxt.lineWidth = 1;
                cxt.lineCap = "round";

                cxt.moveTo(division * i + 60, 20);
                if (i % 10 === 0) {
                    cxt.strokeStyle = initParams.color ? initParams.color : "#ccc";
                    cxt.lineTo(division * i + 60, 5);
                }else if (i % 5 === 0) {
                    cxt.strokeStyle = initParams.color ? initParams.color : "#ccc";
                    cxt.lineTo(division * i + 60, 15);
                }else{
                    cxt.lineTo(division * i + 60, 20 - Math.floor(initParams.height * 0.1));
                }

                cxt.stroke();
                cxt.restore();
                cxt.closePath();
            }

            //添加体重数字
            cxt.beginPath();
            cxt.font = `10px Arial`;
            cxt.fillStyle = "#90a0ae";
            cxt.textAlign = "left";
            cxt.textBaseline = "bottom";

            for (var i = 0; i < Math.ceil(winWidth / (division * 10)); i+=0.5) {
                cxt.fillText(i * bigDivision, (division * i * 10) + 62, 15);
            }

            cxt.closePath();

        }
        drawRuler();
    }
};