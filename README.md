# 介绍

a-datav是一款开箱即用的***开源大屏***搭建工具。 \
演示站：[http://dc.aleiye.cn:8899/](http://dc.aleiye.cn:8899/) \
操作手册：[http://dc.aleiye.cn:8899/help.html](http://dc.aleiye.cn:8899/help.html)

您可以：

1. 按照该手册的指引直接启动、部署服务，快速搭建起功能强大的大屏编辑器，内置几十个功能丰富的大屏组件，即拖即用。
2. 根据您的个性化需求，按照组件开发规范来定制属于您自己的组件，这可能需要您有一定的前端开发基础。
3. 联系我们，只需要少量赞助即可得到满足您需求的定制组件，并且可以在多个项目中重复使用。

### 用前必看

如果您只想用现有的组件搭建大屏，可以先跳过这里，简单的构建部署即可满足您的需求，并且丰富的内置组件可以满足百分之九十的需求。未来我们也会经常提交更新，提供更多优质组件。

如果您希望基于该工具做二次开发，我们做了一些工作以降低您定制组件时的学习和开发门槛：

1. *我们用前端核心模块单独封装了一个纯前端项目(a-datav-front)，前端开发者可以在该项目的基础上做一些定制化开发，开发完成后只需要将新代码复制到主项目(a-datav)下front文件夹中相同路径下即可。*
2. *组件逻辑做了一些优化，使您不需要理解整体代码，只关注组件本身的业务逻辑，按照一定的规范即可定制出功能强大的组件。下面我们会详细介绍定制组件的流程和规范。*
3. *主项目后端只保留了一些核心接口，以便您快速理解项目，也便于您根据自己的需求做一些定制开发，或实现您自己的权限管理模块。您也可以联系我们。*
4. *主项目打包后会生成.jar文件，该文件包含了所有的前后端逻辑，java -jar启动即可直接访问使用。*

# 环境准备

a-datav前端框架用到React，后端框架用到Spring Boot，所以如果您想构建或定制开发，需要以下环境：

1. nodejs v10+
2. npm v6.14+
3. jdk 8.0
4. maven 3.5+

主项目的运行需要依赖数据库保存您创建的大屏相关信息所以还需要：

1. mysql 5.7

如果您只想启动纯前端项目，那么只需要用到：

1. nodejs v10+
2. npm v6.14+

# 项目启动

下面我会分别介绍如何启动纯前端项目和启动主项目。

### 纯前端项目启动

1. 安装 nodejs v10+ 和 npm v6.14+ ，按照官网安装即可。
2. 进入a-datav-front项目根目录，执行 `npm install` ，安装前端依赖。
3. 依赖安装完成后，执行 `npm run start` ，启动项目。
4. 启动完成后，浏览器访问 `http://localhost:3000/` 。

### 主项目启动

1. 安装 nodejs v10+ & npm v6.14+ & jdk 8.0 & maven 3.5+ & mysql 5.7。
2. mysql中新建数据库datav，并执行sql目录里的datav.sql初始化数据库。
3. 修改配置文件，src/main/resources中存放了多环境配置文件，修改当前环境的数据源配置，修改文件上传路径配置(aleiye.upload-locations)。
4. 进入front目录，执行 `npm install` ，安装前端依赖。
5. 启动主程序，这是spring boot项目，直接启动main方法即可。
6. 进入front目录，执行 `npm run watch` ，编译打包前端js代码到target中的资源目录下。

   这里与主流前后端分离项目有一点区别，因为项目不仅包含api还需要包含所有的前端视图，所以前端用React编写的代码
   需要编译成原生js文件，并且放到指定资源目录下，这个过程已在webpack中配置。html文件也指定好了js引用路径。
   执行成功后不要关闭终端，webpack会阻塞在这，监听到前端文件变化后会增量编译到target中。
7. 主程序启动并且前端编译成功后，浏览器访问 http://localhost:8888/ 。

### 主项目打包运行

1. 全局安装webpack，执行 `npm install -g webpack@4.6.0` & `npm install -g webpack-cli@3.1.2`。
2. 用maven打包，执行 `mvn -DskipTests=true package`，或者双击idea中的maven package。

   这一步也会构建前端代码，已在pom中配置好，所以不需要手动构建。
3. 执行target目录中的a-datav-\*.jar，`java -jar a-datav-*.jar`。
4. 启动成功后，浏览器访问 http://localhost:8888/ 。

至此，您已经成功启动项目，并且可以根据需求从头开始或通过内置模版构建属于您的个性化大屏。

# 定制

我们已经开源了几十个功能丰富的大屏组件，支持静态数据和api两种数据源，如果这些无法满足您的需求，我们还对组件做了合理的解偶，使您可以简单学习就能定制自己的组件。

### 组件定制开发

下面我会和您一起定制一个简单的背景组件，在这之前，您需要了解React的基本语法。

- 每个组件至少包含3个文件(文件名随便)：
  1.state.js：组件状态。
  2.Renderer.js：组件渲染器。
  3.Configer.js：组件配置器。
- 在 datav-create/components 下创建文件夹 demo，在demo中创建文件夹 background-demo，这是我们存放组件代码的地方。
- 新建组件状态文件 datav-create/components/demo/background-demo/state.js ：
  ```jsx
  import common_state from "../../common/common_state";
  const state = {
      ...common_state,  //继承通用组件状态，包含组件位置、大小、数据等信息
      w: 1000,          //重写组件默认宽度
      h: 600,           //重写组件默认高度
      backgroundColor: 'rgba(21,163,132,1)'  //自定义字段，Configer中对该值的修改会触发Renderer重新渲染
  }
  export default state;
  ```
- 新建组件渲染器 datav-create/components/demo/background-demo/Renderer.js：
  ```jsx
  import React from 'react'
  
  export default function Renderer({component}){
  
      //component为组件状态，组件状态改变会触发渲染器重新渲染
      let {i: id,_ready,backgroundColor,w,h} = component
      //这里是固定写法，组件非ready时很多属性为空值，如果继续执行可能导致空指针
      if(!_ready)
          return null
      //返回一个简单的div，背景色是在state.js中定义的backgroundColor属性，Configer中可以对该属性进行修改
      return <div style={{backgroundColor:backgroundColor,width: w,height: h}}></div>
  }
  ```
- 新建组件配置器 datav-create/components/demo/background-demo/Configer.js：
  ```jsx
  import React from 'react'
  import { Row,Col } from 'antd4'
  import state from "./state";
  import useUpdateComponent from "../../../hooks/useUpdateComponent";
  import useInitComponent from "../../../hooks/useInitComponent";
  import Palette from "../../../../lib/palette/Palette";
  
  export default function Configer({component}){
      //component为组件状态
      let {i: id,backgroundColor} = component
      //更新组件数据的hooks
      let updateComponent = useUpdateComponent()
      //固定写法，初始化state，执行结束会将组件_ready状态置为true
      let ready = useInitComponent(component,state)
      //固定写法，组件非ready时很多属性为空值，如果继续执行可能导致空指针
      if(!ready)
          return null
      //处理背景色改变事件，调用updateComponent函数提交指定组件的变化
      function handleColorChange(color) {
          //参数1是组件id，组件初始化后，会自动生成唯一id保存到组件状态中
          //参数2是组件状态的改变部分，这些改变会触发渲染器的重新渲染
          updateComponent(id,{backgroundColor: color})
      }
      //页面显示一个调色盘，允许用户修改背景色
      return (
          <>
              <Row style={{marginBottom: 4}}>
                  <Col span={6}>背景颜色</Col>
                  <Col span={18}>
                      <Palette color={backgroundColor} onChange={handleColorChange}/>
                  </Col>
              </Row>
          </>
      )
  }
  ```
- 在框架中定义我们的组件：
  datav-create/components/config/index.js中定义了所有组件，为保证可读性，每个大类单独拆分成单个文件。
  ```jsx
  import React from 'react'
  import general from "./general";
  import antv from "./antv";
  import word from "./word";
  import material from "./material";
  import interactive from "./interactive";
  import custom from "./custom";
  import demo from "./demo";
  import geo from "./geo";
  import hidden from "./hidden";
  
  export default {
      general: general,
      antv: antv,
      geo: geo,
      word: word,
      material: material,
      interactive: interactive,
      custom: custom,
      demo: demo,    //在这里定义demo组件
  
      hidden: hidden //该目录下组件不在列表中显示，可作为子组件使用
  }
  ```

  在datav-create/components/config/demo.js中定义我们的背景组件。
  ```jsx
  import loadable from '@loadable/component'
  import {BarChartOutlined, LineChartOutlined, PictureOutlined} from '@ant-design/icons';
  
  const demo = {
      //一级名称和图标
      icon: BarChartOutlined,
      descr: 'demo',
      children: {
          //二级名称和图标，如果是deft，则页面不显示二级
          deft: {
              icon: LineChartOutlined,
              descr: '折线图',
              children: {
                  //三级名称和图标，包括具体组件的配置器和渲染器，也可以用图片代替图标，参考其他组件
                  background1: {
                      icon: PictureOutlined,
                      descr: '我的背景组件',
                      //我们定制背景组件的配置器，loadable保证组件懒加载，节省带宽
                      configer: loadable(() => import(`../demo/background-demo/Configer`)),
                      //我们定制背景组件的渲染器
                      renderer: loadable(() => import(`../demo/background-demo/Renderer`))
                  }
              }
          },
      }
  }
  export default demo;
  ```
- 完成后，项目改变部分文件结构如下：
  ```
  a-datav
    |_front
      |_datav-create
        |_components
          |_config
            |_demo.js
            |_index.js
          |_demo
            |_background-demo
              |_Configer.js
              |_Renderer.js
              |_state.js
  ```
- 至此，我们的背景组件就开发成功了，可以刷新页面看到成果。组件虽然简单，但包含了最基本的组件开发思路。我们可以举一反三，参考其他组件定制更多更高级更复杂的组件。
- 当然，一个强大的组件还需要更多高级特性，比如组件交互、数据结构定义、显示隐藏控制、父子组件等。您可以参考其他组件定制，或联系我们。

  ### 数据源

  目前我们支持静态数据和api数据源，并且后端集成了dataway插件，主项目启动后，可以访问 http://localhost:8888/interface-ui/ 定义api为大屏提供数据。dataway的具体使用方式请查看官网文档。

  如果有需要，也可以定制数据源，或联系我们。

  ### 用户授权

  为保证核心功能清晰易读，我们删除了复杂的权限模块，只保留了spring security实现的基于JWT的token授权。支持用户的创建，大屏访问的隔离，保证了最基本的权限管理。

  如果有需要，也可以定制符合您业务需要的权限模块或集成已有的单点登录系统，或联系我们。

  # 总结
- 这是一篇开发手册，通过这篇手册，我们了解了a-datav能干什么，并且我们知道如何构建运行它。我们还简单介绍了如何根据我们的需求从零开始定制一个个性化的组件。
- 这篇手册并没有告诉我们如何使用a-datav，如果想了解如何使用它，请参考使用文档。
- 如果想了解更多细节，或需要更多技术支持，或加入我们的开源组织，请联系我们。
