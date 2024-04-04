import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  SharedValue,
  runOnJS,
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import _ from 'lodash';

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

  // Case 3) 스와이프 가능한 아이템
  const [buttonContainerWidth, setButtonContainerWidth] = useState(0);
  const [width, setWidth] = useState(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollX = useSharedValue(0);
  const handler = useAnimatedScrollHandler(
    {
      onBeginDrag: e => {
        scrollX.value = e.contentOffset.x;
      },
      onMomentumBegin: e => {
        scrollX.value = e.contentOffset.x;
      },
      onMomentumEnd: e => {
        console.log('onMomentumEnd', e.contentOffset.x);
        const isActive =
          scrollX.value === 0 &&
          e.contentOffset.x > 0 &&
          e.contentOffset.x < buttonContainerWidth / 2;
        if (isActive) {
          scrollTo(scrollRef, buttonContainerWidth, 0, true);
        } else {
          scrollTo(scrollRef, 0, 0, true);
        }
      },
      onEndDrag: e => {
        console.log('onEndDrag', e.contentOffset.x);
        console.log('onEndDrag', scrollX.value);
        const isActive =
          scrollX.value === 0 &&
          e.contentOffset.x > 0 &&
          e.contentOffset.x < buttonContainerWidth / 2;
        if (isActive) {
          scrollTo(scrollRef, buttonContainerWidth, 0, true);
        } else {
          scrollTo(scrollRef, 0, 0, true);
        }
      },
    },
    [],
  );
  return (
    <GestureDetector gesture={pan}>
      <Animated.ScrollView
        ref={scrollRef}
        style={[styles.item, animatedStyle]}
        horizontal
        showsHorizontalScrollIndicator={false}
        onLayout={e => {
          setWidth(e.nativeEvent.layout.width);
        }}
        onScroll={handler}>
        <View style={{width, height: '100%'}}>{children}</View>
        <View
          onLayout={e => {
            setButtonContainerWidth(e.nativeEvent.layout.width);
          }}
          style={{
            height: '100%',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '100%',
              width: 100,
              backgroundColor: 'pink',
            }}>
            <Text>버튼 1</Text>
          </View>
          <View
            style={{
              height: '100%',
              width: 100,
              backgroundColor: 'aqua',
            }}>
            <Text>버튼 2</Text>
          </View>
        </View>
      </Animated.ScrollView>
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
