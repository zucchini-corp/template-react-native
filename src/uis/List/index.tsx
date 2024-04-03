import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import _ from 'lodash';
import Item from './Item';

interface ListProps<T> {
  items: T[];
  itemHeight: number;
  renderItem: (item: T) => React.ReactNode;
  onChangeOrders: (
    arrayOfItemWithOrder: Array<{item: T; order: number}>,
  ) => void;
}

const List = <T,>({
  items,
  itemHeight = 0,
  renderItem,
  onChangeOrders,
}: ListProps<T>) => {
  const styles = useStyles(itemHeight);
  const [scrollViewMeasureState, setScrollViewMeasureState] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    pageX: 0,
    pageY: 0,
  });
  const scrollOffset = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler(event => {
    scrollOffset.value = event.contentOffset.y;
  });

  const listOfItemOrder = useSharedValue(
    new Array(items.length).fill(0).map((o, i) => i),
  );

  const updateListOfItemOrder = (
    index: number,
    absoluteYOfPressedItem: number,
  ) => {
    // console.log('updateListOfItemOrder');
    let newListOfItemOrder = listOfItemOrder.value;
    const order = _.clamp(
      Math.round(absoluteYOfPressedItem / itemHeight),
      0,
      items.length - 1,
    );
    if (newListOfItemOrder[index] !== order) {
      // console.log('이동합니다.', newListOfItemOrder[index], ' -> ', order);
      newListOfItemOrder = newListOfItemOrder.map(orderOfItem => {
        if (orderOfItem === order) {
          return newListOfItemOrder[index];
        } else {
          return orderOfItem;
        }
      });
      newListOfItemOrder[index] = order;
      listOfItemOrder.value = newListOfItemOrder;
      onChangeOrders(
        newListOfItemOrder.map((o, i) => ({item: items[i], order: o})),
      );
    }
    // console.log('listOfItemOrder.value - ', listOfItemOrder.value);
  };

  return (
    <Animated.ScrollView
      style={styles.scrollView}
      onScroll={handleScroll}
      onLayout={e => {
        e.target.measure((x, y, width, height, pageX, pageY) => {
          setScrollViewMeasureState({x, y, width, height, pageX, pageY});
        });
      }}
      contentContainerStyle={[
        styles.scrollView__container,
        {
          height: itemHeight * items.length,
        },
      ]}>
      {items.map((item, i) => (
        <Item
          key={i}
          itemHeight={itemHeight}
          scrollOffset={scrollOffset}
          scrollViewMeasureState={scrollViewMeasureState}
          index={i}
          listOfItemOrder={listOfItemOrder}
          updateListOfItemOrder={absoluteY =>
            updateListOfItemOrder(i, absoluteY)
          }>
          {renderItem(item)}
        </Item>
      ))}
    </Animated.ScrollView>
  );
};

export default List;

const useStyles = (itemHeight: number) =>
  StyleSheet.create({
    scrollView: {
      width: '100%',
    },
    scrollView__container: {
      position: 'relative',
    },
    item: {
      height: itemHeight,
      borderBottomWidth: 1,
    },
  });
