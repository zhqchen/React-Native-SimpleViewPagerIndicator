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
    TouchableNativeFeedback,
    Animated,
    } = React;

var TAB_VIEW_HEIGHT = 40;

const SCREEN_WIDTH = Dimensions.get('window').width;

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

    getInitialState: function () {
        return {
            animateScrollValue: new Animated.Value(0),
            scrollLineWidth: 0,
            currentPosition: 0,
        };
    },

    componentWillReceiveProps: function(nextProps) {
        var progress = nextProps.progress;
        var SCROLL_LINE_WIDTH = SCREEN_WIDTH / nextProps.pageTitles.length;
        var marginLeft = SCROLL_LINE_WIDTH * (progress.position + progress.offset);
        this.state.animateScrollValue.setValue(marginLeft);
        this.setState({
            scrollLineWidth: SCROLL_LINE_WIDTH,
            currentPosition: progress.position,
        });
    },

    render: function () {
        if (this.props.pageTitles === undefined || !this.props.pageTitles || this.props.pageTitles.length === 0) {
            return;
        }

        const scrollLineStyle = {
            position: 'absolute',
            top: TAB_VIEW_HEIGHT - this.props.scrollLineHeight,
            height: this.props.scrollLineHeight,
            width: this.state.scrollLineWidth,
            backgroundColor: this.props.scrollLineColor,
        };

        const scrollLinePositionStyle = {
            left: this.state.animateScrollValue,
        };

        var tabViews = [];
        var pageTitles = this.props.pageTitles;

        var singleTabContainerStyle = [styles.singleTabContainer, {backgroundColor: this.props.tabBackgroundColor}];

        for (var i = 0; i < pageTitles.length; i++) {
            const key = i;
            tabViews.push(
                <TouchableNativeFeedback
                    style={styles.rowFlex} key={key}
                    onPress={()=>this.props.goToPage(key)}
                    background={TouchableNativeFeedback.Ripple()}>
                    <View style={singleTabContainerStyle}>
                        {
                            this.props.tabTitleMode === 'icon' ?
                                <Image style={styles.tabIconStyle} source={{uri: pageTitles[i]}}/> :
                                <Text
                                    numberOfLines={1}
                                    style={[styles.tabTextStyle,{fontSize: this.props.tabTextSize, color: this.state.currentPosition === i ? this.props.tabTextHighLightColor : this.props.tabTextColor}]}>
                                    {pageTitles[i]}
                                </Text>
                        }
                    </View>
                </TouchableNativeFeedback>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.tabContainer}>
                    {tabViews}
                </View>
                {
                    this.props.isNeedScrollLine === true && <Animated.View style={[scrollLineStyle, scrollLinePositionStyle]}/>
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

    tabIconStyle: {
        flex: 1,
        height: TAB_VIEW_HEIGHT,
        marginRight: 3,
        resizeMode: 'contain',
    },

    tabTextStyle: {
        flex: 1,
        margin: 10,
        textAlign: 'center',
    },

});

module.exports = IndicatorTopView;