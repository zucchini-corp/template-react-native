import React, {useState} from 'react';
import {LayoutChangeEvent, StyleSheet} from 'react-native';
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import _ from 'lodash';
import Item from './Item';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

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
  const scrolling = useSharedValue(false);
  const scrollOffset = useSharedValue(0);
  const listOfItemOrder = useSharedValue(
    new Array(items.length).fill(0).map((o, i) => i),
  );

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  useAnimatedReaction(
    () => scrollOffset.value,
    _scrolling => {
      scrollTo(scrollViewRef, 0, _scrolling, false);
    },
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
    }
    // console.log('listOfItemOrder.value - ', listOfItemOrder.value);
  };

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollOffset.value = event.contentOffset.y;
  });

  const handleLayout = (e: LayoutChangeEvent) => {
    e.target.measure((x, y, width, height, pageX, pageY) => {
      setScrollViewMeasureState({x, y, width, height, pageX, pageY});
    });
  };

  return (
    <GestureHandlerRootView>
      <Animated.ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        onScroll={handleScroll}
        onLayout={handleLayout}
        contentContainerStyle={[
          styles.scrollView__container,
          {height: itemHeight * items.length},
        ]}>
        {items.map((item, i) => (
          <Item
            key={i}
            itemHeight={itemHeight}
            scrolling={scrolling}
            scrollOffset={scrollOffset}
            scrollContainerHeight={itemHeight * items.length}
            scrollViewMeasureState={scrollViewMeasureState}
            index={i}
            listOfItemOrder={listOfItemOrder}
            updateListOfItemOrder={updateListOfItemOrder}
            onMoveEnd={() => {
              onChangeOrders(
                listOfItemOrder.value.map((order, orderIndex) => ({
                  item: items[orderIndex],
                  order,
                })),
              );
            }}>
            {renderItem(item)}
          </Item>
        ))}
      </Animated.ScrollView>
    </GestureHandlerRootView>
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
      height: itemHeight + 0.1, // 소수점 띄워지는 경우 보정
      borderBottomWidth: 1,
    },
  });
