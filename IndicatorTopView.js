/**
 * 轻量级ViewPagerIndicator的实现, 核心利用ViewPagerAndroid的onPageScroll的事件,来重绘指示条
 * Github上另有人实现完整功能 见: react-native-scrollable-tab-view
 * Created by chen on 16/3/2.
 */
'use strict';
var React = require('react-native');

var {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
    } = React;

var IndicatorTopView = React.createClass({

    propTypes: {
        initialPage: React.PropTypes.number,//初始切换tab的索引位置
        pageTitles: React.PropTypes.array,//标题数组
        goToPage: React.PropTypes.func, //点击tab的响应事件
        scrollLineHeight: React.PropTypes.number,//滑动条的高度
        scrollLineColor: React.PropTypes.string,//滑动条的颜色
        tabTextSize: React.PropTypes.number,//标题的字体大小
        tabTextColor: React.PropTypes.string,//标题的字体默认颜色
        tabTextHighLightColor: React.PropTypes.string,//当前标题的高亮颜色
        progress: React.PropTypes.object,//由页码和滑动比例组成的对象
        tabBackgroundColor: React.PropTypes.string, //单个标题区域的背景
        tabDivideLineColor: React.PropTypes.string, //单个标题区域的背景
        isNeedTabDivideLine: React.PropTypes.bool, //是否需要tab的分隔线
    },

    //一些初始默认值
    getDefaultProps: function () {
        return {
            initialPage: 0,
            isNeedTabDivideLine: true,
            scrollLineHeight: 2,
            scrollLineColor: '#fdb933',
            tabTextSize: 16,
            tabTextColor: '#9a9a9a',
            tabTextHighLightColor: '#fdb933',
            tabBackgroundColor: 'white',
            tabDivideLineColor: '#dce1e8',
            progress: {
                page: 0,
                pageOffset: 0,
            },
        };
    },

    getInitialState: function () {
        return {
            progress: {
                page: this.props.initialPage,
                pageOffset: 0,
            },
        };
    },

    render: function () {
        if (this.props.pageTitles === undefined || !this.props.pageTitles || this.props.pageTitles.length === 0) {
            return;
        }

        var SCROLL_LINE_WIDTH = Dimensions.get('window').width / this.props.pageTitles.length;
        var progress = this.props.progress;
        var marginLeft = SCROLL_LINE_WIDTH * (progress.position + progress.offset);

        const scrollLineStyle = {
            height: this.props.scrollLineHeight,
            width: SCROLL_LINE_WIDTH,
            backgroundColor: this.props.scrollLineColor,
            marginLeft: marginLeft,
        };

        var tabViews = [];
        var pageTitles = this.props.pageTitles;

        var singleTabContainerStyle = [styles.singleTabContainer, {backgroundColor: this.props.tabBackgroundColor}];
        var tabDivideLineStyle = [styles.tabVerticalLine, {backgroundColor: this.props.tabDivideLineColor}];

        for (var i = 0; i < pageTitles.length; i++) {
            const key = i;
            tabViews.push(
                <TouchableOpacity style={styles.rowFlex} key={key} onPress={()=>this.props.goToPage(key)} opacity={0.6}>
                    <View style={singleTabContainerStyle}>
                        <Text
                            numberOfLines={1}
                            style={[styles.tabTextStyle,{fontSize: this.props.tabTextSize, color: progress.position === i ? this.props.tabTextHighLightColor : this.props.tabTextColor}]}>
                            {pageTitles[i]}
                        </Text>
                        {
                            this.props.isNeedTabDivideLine && i < pageTitles.length - 1 && <View style={tabDivideLineStyle}/>
                        }
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View>
                <View style={styles.tabContainer}>
                    {tabViews}
                </View>
                <View style={scrollLineStyle}/>
            </View>
        );
    },

});

var styles = StyleSheet.create({

    tabContainer: {
        flexDirection: 'row',
    },

    rowFlex: {
        flex: 1,
        flexDirection: 'row',
    },

    singleTabContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    tabTextStyle: {
        flex: 1,
        margin: 10,
        textAlign: 'center',
    },

    tabVerticalLine: {
        height: 14,
        width: 0.5
    },

});

module.exports = IndicatorTopView;