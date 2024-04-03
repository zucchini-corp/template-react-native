import React from 'react';
import {LayoutChangeEvent, StyleSheet} from 'react-native';
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
  scrolling: SharedValue<boolean>;
  scrollOffset: SharedValue<number>;
  scrollContainerHeight: number;
  scrollViewMeasureState: {
    x: number;
    y: number;
    width: number;
    height: number;
    pageY: number;
    pageX: number;
  };
  listOfItemOrder: SharedValue<number[]>;
  updateListOfItemOrder: (index: number, absoluteY: number) => void;
  onMoveEnd: () => void;
  children?: React.ReactNode;
}

const Item = ({
  index,
  itemHeight = 0,
  scrolling,
  scrollOffset,
  scrollContainerHeight,
  scrollViewMeasureState,
  listOfItemOrder,
  updateListOfItemOrder,
  onMoveEnd,
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
  const moveOffset = itemHeight / 5;
  const onTop = () => {
    scrolling.value = true;
    for (let i = 0; i < 2; i++) {
      scrollOffset.value = Math.max(scrollOffset.value - moveOffset, 0);
    }
    scrolling.value = false;
  };
  const onBottom = () => {
    scrolling.value = true;
    for (let i = 0; i < 2; i++) {
      scrollOffset.value = Math.min(
        scrollOffset.value + moveOffset,
        scrollContainerHeight - scrollViewMeasureState.height,
      );
    }
    scrolling.value = false;
  };
  const pan = Gesture.Pan()
    .activateAfterLongPress(500)
    .maxPointers(1)
    .onStart(() => {
      pressed.value = true;
    })
    .onUpdate(event => {
      const _dy_fromContainer = event.absoluteY - scrollViewMeasureState.pageY;
      const _dy_halfOfItem = itemHeight / 2;
      const _dy_scrollOffset = scrollOffset.value;

      const dy = _dy_fromContainer - _dy_halfOfItem + _dy_scrollOffset;
      top.value = dy;

      const isNotScrolling = !scrolling.value;
      if (isNotScrolling) {
        const scrollDownPoint = scrollViewMeasureState.height - itemHeight;
        if (_dy_fromContainer > scrollDownPoint) {
          runOnJS(onBottom)();
        }
        const scrollUpPoint = itemHeight;
        if (_dy_fromContainer < scrollUpPoint) {
          runOnJS(onTop)();
        }
      }
      runOnJS(updateListOfItemOrder)(index, dy);
    })
    .onEnd(() => {
      pressed.value = false;
      top.value = listOfItemOrder.value[index] * itemHeight;
      runOnJS(onMoveEnd)();
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
