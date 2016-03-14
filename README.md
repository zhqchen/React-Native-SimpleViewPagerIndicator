# React-Native-SimpleViewPagerIndicator
a simple kind of accomplishment of ViewPagerIndicator on Android, need combined with ViewPagerAndroid component.

 ![image](https://github.com/zhqchen/React-Native-SimpleViewPagerIndicator/raw/master/screenshots/result.png)

##  How to run 
1. Prepare your environment: https://facebook.github.io/react-native/docs/getting-started.html#quick-start
2. Clone this repo, and go to the project's root directory
3. run npm install
4. run react-native run-android

## props of SimpleViewPagerIndicator
```
tabTitleMode: 字符串型, 指示栏标题的模式, 'text': 文本模式, 'icon': 图标模式
indicatorViewPosition: 字符串型, 指示栏位置, 'top': 指示栏在顶部, 'bottom': 指示栏在底部
initialPage: 数值型, 初始切换tab的索引位置
pageTitles: 数组型, 标题数组, 当tabTitleMode为text时为标题文本数组; 当tabTitleMode为icon时为标题图标的url数组
goToPage: 函数型, 点击tab的响应事件
scrollLineHeight: 数值型, 滑动条的高度
scrollLineColor: 字符串型, 滑动条的颜色, 如 '#ffffff'
tabTextSize: 数值型, 标题的字体大小
tabTextColor: 字符串型, 标题的字体默认颜色
tabTextHighLightColor: 字符串型, 当前标题的高亮颜色
progress: 对象型, 由页码和滑动比例组成的对象,如progress: {page: 0, pageOffset: 0}
tabBackgroundColor: 数值型, 单个标题区域的背景
tabDivideLineColor: 数值型, tab分隔线的颜色
isNeedTabDivideLine: 字符串型, 是否需要tab的分隔线
```

## example usage
```
var SimpleViewPagerIndicator = require('./SimpleViewPagerIndicator');
var PAGE_TITLES = ['item1', 'item2', 'item3'];
var ViewPagerIndicatorExample = React.createClass({
    render: function () {
        var pages = [];
        for (var i = 0; i < PAGE_TITLES.length; i++) {
            pages.push(
                <Text style={styles.pageText} key={i}>{'this is page of index ' + i}</Text>
            );
        }

        return (
            <SimpleViewPagerIndicator
                initialPage={1}
                pageTitles={PAGE_TITLES}
            >
                {pages}
            </SimpleViewPagerIndicator>
        );
    },
});
```

## TODO
complement of ios