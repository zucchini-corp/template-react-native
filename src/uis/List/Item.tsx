import React, {useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
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

interface ItemProps {
  index: number;
  itemSpacing: number;
  itemStyle?: StyleProp<ViewStyle>;
  itemContentStyle?: StyleProp<ViewStyle>;
  itemOptionButtonContainerStyle?: StyleProp<ViewStyle>;
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
  renderItemOptionButton?: () => React.ReactNode;
  swipable?: boolean;
}

const Item = ({
  index,
  itemSpacing,
  itemStyle,
  itemContentStyle,
  itemOptionButtonContainerStyle,
  itemHeight = 0,
  scrolling,
  scrollOffset,
  scrollContainerHeight,
  scrollViewMeasureState,
  listOfItemOrder,
  updateListOfItemOrder,
  onMoveEnd,
  children,
  renderItemOptionButton,
  swipable,
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
      // borderWidth: pressed.value ? 1 : 0,
      // borderColor: '#eee',
      // elevation: 3,
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
    .onStart(event => {
      pressed.value = true;

      const _dy_fromContainer = event.absoluteY - scrollViewMeasureState.pageY;
      const _dy_halfOfItem = itemHeight / 2;
      const _dy_scrollOffset = scrollOffset.value;

      const dy = _dy_fromContainer - _dy_halfOfItem + _dy_scrollOffset;
      top.value = dy;
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
  const [buttonContainerWidth, setButtonContainerWidth] = useState<number>(0);
  const [width, setWidth] = useState(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const handler = useAnimatedScrollHandler(
    {
      onMomentumEnd: e => {
        console.log('onEndDrag:x:', e.contentOffset.x);
        const isActive = (e.velocity?.x ?? 0) <= 0;
        if (isActive) {
          scrollTo(scrollRef, buttonContainerWidth, 0, true);
        } else {
          scrollTo(scrollRef, 0, 0, true);
        }
      },
      onEndDrag: e => {
        console.log('onEndDrag:x:', e.contentOffset.x);
        const isActive = (e.velocity?.x ?? 0) <= 0;
        if (isActive) {
          scrollTo(scrollRef, buttonContainerWidth, 0, true);
        } else {
          scrollTo(scrollRef, 0, 0, true);
        }
      },
    },
    [buttonContainerWidth],
  );
  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          styles.item,
          itemStyle,
          {height: itemHeight - itemSpacing},
          animatedStyle,
        ]}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{width: '100%'}}
          onLayout={e => {
            // console.log(e.nativeEvent.layout.width);
            if (width === 0) {
              setWidth(e.nativeEvent.layout.width);
            }
          }}
          onScroll={handler}
          scrollEnabled={swipable}>
          <View
            style={[
              {
                width,
                height: '100%',
              },
              itemContentStyle,
            ]}>
            {children}
          </View>
          <View
            onLayout={e => {
              setButtonContainerWidth(e.nativeEvent.layout.width);
            }}
            style={[
              {
                height: '100%',
                flexDirection: 'row',
              },
              itemOptionButtonContainerStyle,
            ]}>
            {renderItemOptionButton && renderItemOptionButton()}
          </View>
        </Animated.ScrollView>
      </Animated.View>
    </GestureDetector>
  );
};

export default Item;

const useStyles = (itemHeight: number) =>
  StyleSheet.create({
    item: {
      position: 'absolute',
      height: itemHeight,
      width: '100%',
      overflow: 'hidden',
    },
  });
