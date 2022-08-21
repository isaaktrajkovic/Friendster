import React, { useState  } from 'react';
import { Text, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

const SwipeComponent = (props, state) => {
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  const [myText, setMyText] = useState("NEKI TEKST");

  const onSwipeUp = (gestureState) => {
    setMyText("UP")
  }

  const onSwipeDown = (gestureState) => {
    setMyText("DOWN")
  }

  const onSwipeLeft = (gestureState) => {
    setMyText("LEFT")
  }

  const onSwipeRight = (gestureState) => {
    setMyText("RIGHT")
  }

  return (
    <View style={{height: 500, flex: 1, paddingTop: 30, backgroundColor: '#000' }}>
      <GestureRecognizer
        onSwipe={(direction, state) => console.log("WE ARE DIRECTION AND STATE AND DIRECTION ", direction, state)}
        onSwipeUp={(state) => onSwipeUp(state)}
        onSwipeDown={(state) => onSwipeDown(state)}
        onSwipeLeft={(state) => onSwipeLeft(state)}
        onSwipeRight={(state) => onSwipeRight(state)}
        config={config}
        style={{
          height: 400,
          flex: 1,
          backgroundColor: "#fff"
        }}
        >
        <Text>{myText}</Text>
      </GestureRecognizer>
    </View>
  )
}

export default SwipeComponent;