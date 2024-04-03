import React from 'react';
import {LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

interface ItemProps {
  index: number;
  itemHeight: number;
  scrollOffset: SharedValue<number>;
  scrollViewMeasureState: {
    x: number;
    y: number;
    width: number;
    height: number;
    pageY: number;
    pageX: number;
  };
  listOfItemOrder: SharedValue<number[]>;
  updateListOfItemOrder: (absoluteY: number) => void;
  onLayout?: (e: LayoutChangeEvent) => void;
  children?: React.ReactNode;
}

const Item = ({
  index,
  itemHeight = 0,
  scrollOffset,
  scrollViewMeasureState,
  listOfItemOrder,
  updateListOfItemOrder,
  children,
}: ItemProps) => {
  const styles = useStyles(itemHeight);
  const pressed = useSharedValue(false);
  const top = useSharedValue(itemHeight * index);

  // Case 1) 정지되어 있는 아이템
  useAnimatedReaction(
    () => listOfItemOrder.value[index],
    (prev, next) => {
      if (prev !== next) {
        if (!pressed.value) {
          top.value = withTiming(listOfItemOrder.value[index] * itemHeight);
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
    .activateAfterLongPress(500)
    .maxPointers(1)
    .onStart(() => {
      pressed.value = true;
    })
    .onUpdate(event => {
      const dy =
        event.absoluteY -
        scrollViewMeasureState.pageY -
        itemHeight / 2 +
        scrollOffset.value;
      top.value = dy;
      runOnJS(updateListOfItemOrder)(dy);
    })
    .onEnd(() => {
      pressed.value = false;
      top.value = listOfItemOrder.value[index] * itemHeight;
    });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.item, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export default Item;

const useStyles = (itemHeight: number) =>
  StyleSheet.create({
    item: {
      position: 'absolute',
      width: '100%',
      height: itemHeight,
      backgroundColor: '#ffeeee',
    },
  });
