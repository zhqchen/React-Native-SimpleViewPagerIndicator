/**
 * 轻量级ViewPagerIndicator的实现, 核心利用ViewPagerAndroid的onPageScroll的事件,来重绘指示条
 * Github上另有人实现完整功能 见: react-native-scrollable-tab-view
 * Created by chen on 16/3/10.
 */
'use strict';
var React = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    ViewPagerAndroid,
    } = React;

var IndicatorTopView = require('./IndicatorTopView');

var SimpleViewPagerIndicator = React.createClass({

    propTypes: {
        initialPage: React.PropTypes.number,//初始切换tab的索引位置
        pageTitles: React.PropTypes.array,//标题数组
        scrollLineHeight: React.PropTypes.number,//滑动条的高度
        scrollLineColor: React.PropTypes.string,//滑动条的颜色
        tabTextSize: React.PropTypes.number,//标题的字体大小
        tabTextColor: React.PropTypes.string,//标题的字体默认颜色
        tabTextHighLightColor: React.PropTypes.string,//当前标题的高亮颜色
        tabBackgroundColor: React.PropTypes.string, //单个标题区域的背景
        tabDivideLineColor: React.PropTypes.string, //tab分隔线的颜色
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
        };
    },

    getInitialState: function () {
        return {
            page: 0,
            animationsAreEnabled: true,//是否运行动画
            progress: {
                position: this.props.initialPage,
                offset: 0,
            },
        };
    },

    onPageSelected: function (e) {
        this.setState({
            page: e.nativeEvent.position,
        });
    },

    onPageScroll: function (e) {
        this.setState({
            progress: e.nativeEvent,
        });
    },

    onPageScrollStateChanged: function (state:ViewPagerScrollState) {
        this.setState({
            scrollState: state,
        });
    },

    //切换到第page页
    goToPage: function (page) {
        if (this.state.animationsAreEnabled) {
            this.viewPager.setPage(page);
        } else {
            this.viewPager.setPageWithoutAnimation(page);
        }

        this.setState({page});
    },

    getChildrenComponents: function () {
        return React.Children.map(this.props.children, (child)=> child);
    },

    render: function () {
        return (
            <View style={styles.container}>

                <IndicatorTopView
                    initialPage={this.props.initialPage}
                    pageTitles={this.props.pageTitles}
                    scrollLineHeight={this.props.scrollLineHeight}
                    scrollLineColor={this.props.scrollLineColor}
                    tabTextSize={this.props.tabTextSize}
                    tabTextColor={this.props.tabTextColor}
                    tabTextHighLightColor={this.props.tabTextHighLightColor}
                    tabBackgroundColor={this.props.tabBackgroundColor}
                    tabDivideLineColor={this.props.tabDivideLineColor}
                    isNeedTabDivideLine={this.props.isNeedTabDivideLine}
                    progress={this.state.progress}
                    goToPage={(page)=>this.goToPage(page)}
                />

                <ViewPagerAndroid
                    ref={viewPager => { this.viewPager = viewPager; }}
                    style={styles.viewPager}
                    initialPage={this.props.initialPage}
                    onPageScroll={this.onPageScroll}
                    onPageSelected={this.onPageSelected}
                    onPageScrollStateChanged={this.onPageScrollStateChanged}
                >
                    {
                        this.getChildrenComponents().map((child, index) => {
                            return (
                                <View style={styles.pageStyle} key={index}>
                                    {child}
                                </View>
                            );
                        })
                    }
                </ViewPagerAndroid>

            </View>
        );
    },

});

var styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
    },

    viewPager: {
        flex: 1,
    },

    pageStyle: {
        flex: 1,
        backgroundColor: '#f3f5f9',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

module.exports = SimpleViewPagerIndicator;
