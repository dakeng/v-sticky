# v-sticky
Vue自定义指令，用于实现sticky定位

## 原理
当 viewport 视口滚动到一定位置，目标元素由 static 定位变为 fixed 定位，当滚动超出限定位置后又变为 static 定位。

## 依赖
jQuery

## 使用
参数|说明|类型|可选值|默认值
--|:--:|:--:|:--:|--:
ignore|当窗口顶部已存在 fixed 定位的元素，可通过添加这些元素，是目标元素距视口顶部的高度向下推移|Array|-|-
top|元素与视口顶部的距离，实际上计算的时候会通过 ignoreHeight + top 来确定元素距市口的高度|Number|-|0
stickyCssClass|元素为 fixed 定位后添加的样式类|Array|-|-
relate|与元素绑定的某一祖先元素，当该祖先元素底部与目标元素底部相距为0后，目标元素相对该祖先元素定位，始终处于底部重叠的状态|string|-|-
validWidth|该指令生效的视口宽度范围，为左闭右开区间|Array|-|-
validHeight|该指令生效的视口高度范围，为左闭右开区间|Array|-|-

## 示例
```
<!-- 目标元素必须有父元素才能正确定位 -->
<div class="sticky-wrapper">
  <div v-sticky="{ignore: ['#header']}"></div>
</div>
```

```
<div class="com">
  <div class="main"><div>
  <div class="sticky-wrapper">
    <div v-sticky="{ignore: ['#header', '#ad-container'], relate: '.com'}" class="side"></div>
  </div>
</div>
```

```
<div>
  <div v-sticky="{validWidth: [1024], validHeight: [860]}"></div>
</div>
```
