import { useContext } from "react";
import styled from "styled-components/native";
import { GameContext } from "../context/GameContext";
import {
  Gesture,
  GestureDetector,
  Directions,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
`;

const ScoreText = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: ${(props) => props.theme.primary};
  margin-bottom: 50px;
`;

const ClickerObject = styled(Animated.View)`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: ${(props) => props.theme.primary};
  justify-content: center;
  align-items: center;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 5px;
  shadow-offset: 0px 2px;
`;

const ClickerText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

export default function PlayScreen() {
  const { score, addScore, updateStat } = useContext(GameContext);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const singleTap = Gesture.Tap().onEnd(() => {
    runOnJS(addScore)(1);
    runOnJS(updateStat)("taps");
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(addScore)(2);
      runOnJS(updateStat)("doubleTaps");
    });

  const longPress = Gesture.LongPress()
    .minDuration(3000)
    .onEnd(() => {
      runOnJS(addScore)(5);
      runOnJS(updateStat)("longPresses");
    });

  const pan = Gesture.Pan()
    .onChange((e) => {
      translateX.value += e.changeX;
      translateY.value += e.changeY;
    })
    .onEnd(() => {
      runOnJS(updateStat)("drags");
    })
    .onFinalize(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      const randomPoints = Math.floor(Math.random() * 10) + 1;
      runOnJS(addScore)(randomPoints);
      runOnJS(updateStat)("swipeRight");
    });

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      const randomPoints = Math.floor(Math.random() * 10) + 1;
      runOnJS(addScore)(randomPoints);
      runOnJS(updateStat)("swipeLeft");
    });

  const pinch = Gesture.Pinch()
    .onChange((e) => {
      scale.value = e.scale;
    })
    .onEnd(() => {
      runOnJS(addScore)(3);
      runOnJS(updateStat)("pinches");
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
    });

  const taps = Gesture.Exclusive(doubleTap, singleTap);
  const composedGestures = Gesture.Simultaneous(
    taps,
    longPress,
    pan,
    flingRight,
    flingLeft,
    pinch,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Container>
      <ScoreText>{score}</ScoreText>
      <GestureDetector gesture={composedGestures}>
        <ClickerObject style={animatedStyle}>
          <ClickerText>TAP ME</ClickerText>
        </ClickerObject>
      </GestureDetector>
    </Container>
  );
}
