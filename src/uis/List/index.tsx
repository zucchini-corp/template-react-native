import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import _ from 'lodash';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

interface ListProps<T> {
  items: T[];
}

interface ItemProps {
  index: number;
  listOfItemOrder: SharedValue<number[]>;
  updateListOfItemOrder: (absoluteY: number) => void;
}

const ITEM_HEIGHT = 60;
const Item = ({index, listOfItemOrder, updateListOfItemOrder}: ItemProps) => {
  const pressed = useSharedValue(false);
  const top = useSharedValue(ITEM_HEIGHT * index);

  // Case 1) 정지되어 있는 아이템
  useAnimatedReaction(
    () => listOfItemOrder.value[index],
    (prev, next) => {
      if (prev !== next) {
        if (!pressed.value) {
          top.value = withTiming(listOfItemOrder.value[index] * ITEM_HEIGHT);
        }
      }
    },
  );

  // Case 2) 움직이는 아이템
  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
      backgroundColor: pressed.value ? '#eee' : '#fff',
      zIndex: pressed.value ? 999 : 0,
    };
  }, []);
  const pan = Gesture.Pan()
    .maxPointers(1)
    .onStart(() => {
      pressed.value = true;
    })
    .onUpdate(event => {
      top.value = event.absoluteY;
      runOnJS(updateListOfItemOrder)(event.absoluteY);
    })
    .onEnd(() => {
      pressed.value = false;
      top.value = listOfItemOrder.value[index] * ITEM_HEIGHT;
    });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: '100%',
            height: ITEM_HEIGHT,
            backgroundColor: '#ffeeee',
          },
          animatedStyle,
        ]}>
        <Text>Item - {index}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const List = <T,>({items}: ListProps<T>) => {
  const listOfItemOrder = useSharedValue(
    new Array(items.length).fill(0).map((o, i) => i),
  );

  const updateListOfItemOrder = (
    index: number,
    absoluteYOfPressedItem: number,
  ) => {
    console.log('updateListOfItemOrder');
    let newListOfItemOrder = listOfItemOrder.value;
    const order = _.clamp(
      Math.round(absoluteYOfPressedItem / ITEM_HEIGHT),
      0,
      items.length - 1,
    );
    if (newListOfItemOrder[index] !== order) {
      console.log('이동합니다.', newListOfItemOrder[index], ' -> ', order);
      newListOfItemOrder = newListOfItemOrder.map(orderOfItem => {
        if (orderOfItem === order) {
          return newListOfItemOrder[index];
        } else {
          return orderOfItem;
        }
      });
    }
    newListOfItemOrder[index] = order;
    listOfItemOrder.value = newListOfItemOrder;
    console.log('listOfItemOrder.value - ', listOfItemOrder.value);
  };

  return (
    <Animated.ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.scrollView__container,
        {height: ITEM_HEIGHT * items.length, position: 'relative'},
      ]}>
      {items.map((item, i) => (
        <Item
          key={i}
          index={i}
          listOfItemOrder={listOfItemOrder}
          updateListOfItemOrder={absoluteY =>
            updateListOfItemOrder(i, absoluteY)
          }
        />
      ))}
    </Animated.ScrollView>
  );
};

export default List;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  scrollView__container: {
    position: 'relative',
  },
  item: {
    height: ITEM_HEIGHT,
    borderBottomWidth: 1,
  },
});
