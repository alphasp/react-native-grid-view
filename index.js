'use strict';

import React from 'react';
import { StyleSheet, View, ListView } from 'react-native';

export default
class CollectionView extends React.Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    groupItems(items, itemsPerRow) {
        let itemsGroups = [];
        let group = [];
        items.forEach((item) => {
            if(group.length === itemsPerRow) {
                itemsGroups.push(group);
                group = [item];
            } else {
                group.push(item);
            }
        });

        if(group.length > 0) {
            if(this.props.cleanGrid == true) {
                while (group.length < itemsPerRow) {
                    group.push(null);
                }
            }
            itemsGroups.push(group);
        }

        return itemsGroups;
    }

    renderGroup(rowData, sectionID, rowID, highlightRow) {
        const items = rowData.map((item) => this.props.renderItem(item));
        return (
            <View key={"GRIDVIEW_ROW_"+sectionID+"_"+rowID}
                  style={styles.group}>
                {items}
            </View>
        );
    }

    render() {
        const groups = this.groupItems(this.props.items, this.props.itemsPerRow);
        return <ListView key="GRIDVIEW"
                         {...this.props}
                         dataSource={this.ds.cloneWithRows(groups)}
                         renderRow={this.renderGroup.bind(this)} />;
    }
};

const styles = StyleSheet.create({
    group: {
        flexDirection: 'row',
        overflow: 'hidden'
    }
});
