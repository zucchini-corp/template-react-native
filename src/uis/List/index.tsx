import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
  order: number;
  orderOfPressedItem: SharedValue<number>;
  updateOrderOfPressedItem: (absoluteY: number) => void;
}

const ITEM_HEIGHT = 60;
const Item = ({
  order,
  orderOfPressedItem,
  updateOrderOfPressedItem,
}: ItemProps) => {
  const pressed = useSharedValue(false);
  const translateY = useSharedValue(0);

  // Case 1) 정지되어 있는 아이템
  const moveUp = () => {
    translateY.value = withTiming(-ITEM_HEIGHT);
  };
  const moveOrigin = () => {
    translateY.value = withTiming(0);
  };
  const moveDown = () => {
    translateY.value = withTiming(ITEM_HEIGHT);
  };
  useAnimatedReaction(
    () => orderOfPressedItem.value,
    (prev, next) => {
      if (prev !== next) {
        if (!pressed.value) {
          console.log('움직이는 아이템 순서 - ', orderOfPressedItem.value);
          // runOnJS(moveDown)();
        }
      }
      // runOnJS(moveOrigin)();
    },
  );

  // Case 2) 움직이는 아이템
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
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
      // console.log('event.absoluteY - ', event.absoluteY);
      // console.log('event.translationY - ', event.translationY);
      translateY.value = event.translationY;
      runOnJS(updateOrderOfPressedItem)(event.absoluteY);
    })
    .onEnd(() => {
      pressed.value = false;
      translateY.value = 0;
      // runOnJS(moveUp)();
    });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          {height: ITEM_HEIGHT, backgroundColor: '#ffeeee'},
          animatedStyle,
        ]}>
        <Text>Item = {order}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const List = <T,>({items}: ListProps<T>) => {
  const orderOfPressedItem = useSharedValue(0);

  const updateOrderOfPressedItem = (absoluteYOfPressedItem: number) => {
    const order = Math.round(absoluteYOfPressedItem / ITEM_HEIGHT);
    orderOfPressedItem.value = _.clamp(order, 0, items.length - 1);
  };

  return (
    <Animated.ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.scrollView__container,
        {height: ITEM_HEIGHT * items.length},
      ]}>
      {items.map((item, i) => (
        <Item
          key={i}
          order={i}
          orderOfPressedItem={orderOfPressedItem}
          updateOrderOfPressedItem={updateOrderOfPressedItem}
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
