/*
 *   Copyright (c) 2022 Yash Yogesh Gaidhani
 *   All rights reserved.
 *   This work belongs to Yash Yogesh Gaidhani
 */
import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import {View, StyleSheet, Dimensions} from "react-native";
import { Button } from "react-native-elements";
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withRepeat, useAnimatedGestureHandler} from "react-native-reanimated";
import { PanGestureHandler, gestureHandlerRootHOC } from "react-native-gesture-handler";

const deviceheight = Dimensions.get('window').height;
const devicewidth = Dimensions.get('window').width;

const App = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const animation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = x.value;
      context.translateY = y.value;
    },
    onActive: (event, context) => {
      x.value = event.translationX + context.translateX;
      y.value = event.translationY + context.translateY;
    },
    onEnd: (event) => {
      let distance = Math.sqrt((event.translationX ** 2) + (event.translationY ** 2));
      if (distance < (devicewidth * 0.45 + 25)) {
        x.value = withSpring(0);
        y.value = withSpring(0);
      } else {
        x.value = event.translationX;
        y.value = event.translationY;
      }
    },
  });

  const Gesturehandler = gestureHandlerRootHOC(() => (
    <View style={styles.background_style}>
      <View style={styles.circle_style}>
        <PanGestureHandler onGestureEvent={eventHandler}>
          <Animated.View style={[styles.box, animation]} />
        </PanGestureHandler>
      </View>
    </View>
  ));

  return(
    <Gesturehandler />
  )
}

const styles = StyleSheet.create({
  background_style: {
    width: devicewidth,
    height: deviceheight,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 256, 0.5)',
    borderRadius: 20,
  },
  circle_style: {
    width: devicewidth * 0.9,
    height: devicewidth * 0.9,
    borderRadius: 200,
    borderWidth: 4,
    borderColor: 'rgba(0, 0, 256, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default App;