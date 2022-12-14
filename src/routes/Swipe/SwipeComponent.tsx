import React, {useEffect, useState} from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  LayoutAnimation,
  UIManager,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const SwipeComponent = props => {
  const position = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      position.setValue({x: gesture.dx, y: gesture.dy});
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        forceSwipe('right');
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        forceSwipe('left');
      } else {
        resetPosition();
      }
    },
  });

  const [index, setIndex] = useState(0);

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, [index]);

  const forceSwipe = direction => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: {x, y: 0},
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = direction => {
    const {onSwipeLeft, onSwipeRight, data} = props;
    const item = data[index];
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({x: 0, y: 0});
    setIndex(index + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });
    return {
      ...position.getLayout(),
      transform: [{rotate}],
    };
  };

  const renderCards = () => {
    if (index >= props.data.length) {
      return props.renderNoMoreCards();
    }

    return props.data
      .map((item, i) => {
        if (i < index) return null;
        if (i === index) {
          return (
            <Animated.View
              key={item.id}
              style={[getCardStyle(), styles.cardStyle]}
              {...panResponder.panHandlers}>
              {props.renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            style={[styles.cardStyle, {top: 10 * (i - index)}]}>
            {props.renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
});

export default SwipeComponent;
