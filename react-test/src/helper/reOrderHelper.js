export const reOrder = (list, from, to) => {
    let newOrder = list.slice();
    const startIndex = to < 0 ? list.length + to : to;
    const item = newOrder.splice(from, 1)[0];
    newOrder.splice(startIndex, 0, item);

    return newOrder;
}