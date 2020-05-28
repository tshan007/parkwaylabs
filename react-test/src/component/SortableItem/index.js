import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { List } from 'antd'

const SortableItem = SortableElement(({ value, key }) =>
    <List.Item key={key}>
        <div>{value}</div>
    </List.Item>);

export default SortableItem;

