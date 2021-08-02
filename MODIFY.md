修改了一些插件样式

src/main/resources/static/css/theme/antd-dark.min.css
h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:.5em;color:hsla(0,0%,100%,.85);font-weight:500} 改为 
h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:.5em;font-weight:500}

src/main/resources/static/css/theme/antd-default.less
删除了 h1,h2,h3,h4,h5,h6的颜色设置 color: rgba(0, 0, 0, 0.85); （16行）
删除了 ant-picker-input > input 的字体设置 (8176,8177行)
编译该文件 lessc antd-default.less antd-default.min.css -js -x

src/main/resources/static/css/theme/antd-datav-canvas.less
删除了 h1,h2,h3,h4,h5,h6的颜色设置 color: rgba(0, 0, 0, 0.85); （16行）
删除了 ant-picker-input > input 的字体设置 (8176,8177行)

src/main/resources/static/js/lib/echarts-wordcloud.min.js(641行)
修改了return minRotation + Math.round(Math.random() * rotationRange / rotationStep) * rotationStep;为return minRotation + Math.round(rotationRange / rotationStep) * 180;