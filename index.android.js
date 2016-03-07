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
    Text,
    AppRegistry,
    ViewPagerAndroid,
    } = React;

var IndicatorTopView = require('./IndicatorTopView');

var PAGE_TITLES = ['item1', 'item2', 'item3'];

var SimpleViewPagerIndicator = React.createClass({

    getInitialState: function () {
        return {
            page: 0,
            animationsAreEnabled: true,//是否运行动画
            progress: {
                position: 0,
                offset: 0,
            },
        };
    },

    onPageSelected: function (e) {
        //e.nativeEvent.position
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
        console.log('goToPage--->' + page);
        if (this.state.animationsAreEnabled) {
            this.viewPager.setPage(page);
        } else {
            this.viewPager.setPageWithoutAnimation(page);
        }

        this.setState({page});
    },

    render: function () {

        var pages = [];
        for (var i = 0; i < PAGE_TITLES.length; i++) {
            pages.push(
                <View key={i} style={styles.pageStyle}>
                    <Text style={styles.pageText}>{'this is page of index ' + i}</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>

                <IndicatorTopView
                    initialPage={this.state.initialPage}
                    pageTitles={PAGE_TITLES}
                    progress={this.state.progress}
                    goToPage={(page)=>this.goToPage(page)}
                />

                <ViewPagerAndroid
                    ref={viewPager => { this.viewPager = viewPager; }}
                    style={styles.viewPager}
                    initialPage={1}
                    onPageScroll={this.onPageScroll}
                    onPageSelected={this.onPageSelected}
                    onPageScrollStateChanged={this.onPageScrollStateChanged}
                >
                    {pages}
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

    pageText: {
        fontSize: 15,
        color: '#9a9a9a',
    },

});

AppRegistry.registerComponent('SimpleViewPagerIndicator', () => SimpleViewPagerIndicator);
