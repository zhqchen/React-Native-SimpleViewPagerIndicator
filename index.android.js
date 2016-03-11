/**
 * 轻量级ViewPagerIndicator的实现, 核心利用ViewPagerAndroid的onPageScroll的事件,来重绘指示条
 * Github上另有人实现完整功能 见: react-native-scrollable-tab-view
 * Created by chen on 16/3/2.
 */
'use strict';
var React = require('react-native');

var {
    AppRegistry,
    } = React;

var ViewPagerIndicatorExample = require('./ViewPagerIndicatorExample');

AppRegistry.registerComponent('SimpleViewPagerIndicator', () => ViewPagerIndicatorExample);