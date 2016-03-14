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

var PAGE_TITLES = ['item0', 'item1', 'item2'];
var PAGE_TITLES2 = ['ic_alarm_white_24dp', 'ic_grade_white_24dp', 'ic_work_white_24dp'];

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
                tabTitleMode={'text'}
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
