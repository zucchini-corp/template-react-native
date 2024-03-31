import React, {useEffect} from 'react';
import {
  LayoutChangeEvent,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

interface Props {
  visible?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children?: React.ReactNode;
  renderSubmitButton?: ({confirm}: {confirm: () => void}) => React.ReactNode;
}

const BottomSheet = ({
  visible,
  onClose,
  onConfirm,
  children,
  renderSubmitButton,
}: Props) => {
  const {height} = useWindowDimensions();
  const pressed = useSharedValue(false);
  const closePosition = useSharedValue(1);
  const y = useSharedValue(height);
  const endPosition = 0;
  const limitPosition = 70;

  const show = () => {
    y.value = withTiming(0);
  };

  const hide = () => {
    y.value = withTiming(closePosition.value, undefined, isFinished => {
      if (isFinished) {
        runOnJS(onClose)();
      }
    });
  };

  const confirm = () => {
    y.value = withTiming(closePosition.value, undefined, isFinished => {
      if (isFinished) {
        runOnJS(onConfirm)();
      }
    });
  };

  const pan = Gesture.Pan()
    .onStart(() => {
      pressed.value = true;
    })
    .onUpdate((e: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      console.log('onUpdate');
      const _y = endPosition + e.translationY;
      if (_y >= 0) {
        y.value = _y;
      }
    })
    .onEnd((e: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
      console.log('onEnd');
      pressed.value = false;
      const _y = endPosition + e.translationY;
      if (_y < limitPosition) {
        y.value = withTiming(endPosition);
      } else {
        y.value = withTiming(closePosition.value, undefined, isFinished => {
          if (isFinished) {
            runOnJS(hide)();
          }
        });
      }
    });

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: 1 - Math.min(y.value / closePosition.value, 1),
    };
  }, []);

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? '#fff' : '#fff',
      transform: [{translateY: y.value}],
    };
  }, []);

  const handleLayoutContent = (e: LayoutChangeEvent) => {
    const _height = e.nativeEvent.layout.height;
    if (_height > 0) {
      closePosition.value = _height;
      y.value = _height;
      show();
    }
  };

  return (
    <Modal visible={visible} style={styles.container} transparent>
      <Animated.View style={[styles.background, animatedBackgroundStyle]} />
      <TouchableOpacity
        style={styles.backgroundTouchContainer}
        onPress={hide}
      />
      <GestureHandlerRootView>
        <Animated.View
          style={[styles.bottomContainer, animatedContentStyle]}
          onLayout={handleLayoutContent}>
          <GestureDetector gesture={pan}>
            <Animated.View style={styles.barContainer}>
              <View style={styles.bar} />
              <View>{children}</View>
              {renderSubmitButton && renderSubmitButton({confirm})}
            </Animated.View>
          </GestureDetector>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    flexDirection: 'column',
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  gestureContainer: {
    flex: 1,
  },
  backgroundTouchContainer: {
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: '#ffffff',
    marginTop: 'auto',
    borderRadius: 32,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  barContainer: {
    paddingVertical: 20,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bar: {
    backgroundColor: '#dfdfdf',
    borderRadius: 20,
    width: '25%',
    height: 4,
  },
});
