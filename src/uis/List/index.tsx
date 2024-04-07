import React, {useState} from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
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
  itemSpacing?: number;
  itemStyle?: StyleProp<ViewStyle>;
  itemContentStyle?: StyleProp<ViewStyle>;
  itemOptionButtonContainerStyle?: StyleProp<ViewStyle>;
  itemHeight: number;
  renderItem: (item: T, key: number) => React.ReactNode;
  renderItemOptionButton?: (item: T) => React.ReactNode;
  onChangeOrders: (
    arrayOfItemWithOrder: Array<{item: T; order: number}>,
  ) => void;
  swipable: boolean;
}

const List = <T,>({
  items,
  itemSpacing = 0,
  itemStyle,
  itemContentStyle,
  itemOptionButtonContainerStyle,
  itemHeight = 0,
  renderItem,
  renderItemOptionButton,
  onChangeOrders,
  swipable = true,
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
    console.log('Hi');
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
          {
            height: Math.max(
              itemHeight * items.length,
              scrollViewMeasureState.height,
            ),
          },
        ]}>
        {items.map((item, i) => (
          <Item
            key={i}
            itemSpacing={itemSpacing}
            itemStyle={itemStyle}
            itemContentStyle={itemContentStyle}
            itemOptionButtonContainerStyle={itemOptionButtonContainerStyle}
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
            }}
            renderItemOptionButton={() =>
              renderItemOptionButton && renderItemOptionButton(item)
            }
            swipable={swipable}>
            {renderItem(item, i)}
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
      height: itemHeight,
      borderBottomWidth: 1,
    },
  });
