/**
 * 示例界面
 * Created by chen on 16/3/10.
 */
'use strict';
var React = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    } = React;

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

var styles = StyleSheet.create({

    pageText: {
        fontSize: 15,
        color: '#9a9a9a',
    },

});

module.exports = ViewPagerIndicatorExample;
