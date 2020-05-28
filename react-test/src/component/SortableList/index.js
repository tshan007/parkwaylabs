import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from "../SortableItem";
import { List } from 'antd'

const SortableList = SortableContainer(({ items }) => {
    return (
        <List>
            {items.map((item, index) => (
                <SortableItem key={`item-${item._id}`} index={index} value={item.name} />
            ))}
        </List>
    );
});

export default SortableList;