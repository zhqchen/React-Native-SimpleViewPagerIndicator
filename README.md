# React-Native-SimpleViewPagerIndicator
a simple kind of accomplishment of ViewPagerIndicator on Android, need combined with ViewPagerAndroid component.

 ![image](https://github.com/zhqchen/React-Native-SimpleViewPagerIndicator/raw/master/screenshots/result.png)

##  How to run 
1. Prepare your environment: https://facebook.github.io/react-native/docs/getting-started.html#quick-start
2. Clone this repo, and go to the project's root directory
3. run npm install
4. run react-native run-android

## props of IndicatorTopView
1. initialPage: 数值型, 初始切换tab的索引位置
2. pageTitles: 数组型, 标题数组
3. goToPage: 函数型, 点击tab的响应事件
4. scrollLineHeight: 数值型, 滑动条的高度
5. scrollLineColor: 字符串型, 滑动条的颜色, 如 '#ffffff'
6. tabTextSize: 数值型, 标题的字体大小
7. tabTextColor: 字符串型, 标题的字体默认颜色
8. tabTextHighLightColor: 字符串型, 当前标题的高亮颜色
9. progress: 对象型, 由页码和滑动比例组成的对象,如progress: {page: 0, pageOffset: 0}
10. tabBackgroundColor: 数值型, 单个标题区域的背景
11. tabDivideLineColor: 数值型, tab分隔线的颜色
12. isNeedTabDivideLine: 字符串型, 是否需要tab的分隔线