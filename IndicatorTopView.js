/**
 * 滑动指示栏
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

var TAB_VIEW_HEIGHT = 40;

var IndicatorTopView = React.createClass({

    propTypes: {
        isNeedScrollLine: React.PropTypes.bool, //是否需要滑动条
    },

    //一些初始默认值
    getDefaultProps: function () {
        return {
            isNeedScrollLine: true,
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
            position : 'absolute',
            height: this.props.scrollLineHeight,
            width: SCROLL_LINE_WIDTH,
            backgroundColor: this.props.scrollLineColor,
            marginLeft: marginLeft,
            top: TAB_VIEW_HEIGHT - this.props.scrollLineHeight,
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
            <View style={styles.container}>
                <View style={styles.tabContainer}>
                    {tabViews}
                </View>
                {
                    this.props.isNeedScrollLine === true && <View style={scrollLineStyle}/>
                }
            </View>
        );
    },

});

var styles = StyleSheet.create({

    container: {
        height: TAB_VIEW_HEIGHT,
        justifyContent: 'center',
    },

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