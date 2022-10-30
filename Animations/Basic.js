/*
 *   Copyright (c) 2022 Yash Yogesh Gaidhani
 *   All rights reserved.
 *   This work belongs to Yash Yogesh Gaidhani
 */
/*
 *   Copyright (c) 2022 Yash Yogesh Gaidhani
 *   All rights reserved.
 *   This work belongs to Yash Yogesh Gaidhani
 */

import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text,  Dimensions} from "react-native";
import { Button } from "react-native-elements";
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withRepeat} from "react-native-reanimated";

const deviceheight = Dimensions.get('window').height;
const devicewidth = Dimensions.get('window').width;

const App = () => {

  const offset = useSharedValue(0.5);
  const scale = useSharedValue(1);

  const animate = useAnimatedStyle(() => {
    return {
      opacity: offset.value,
      borderRadius: offset.value * 10,
      transform: [{scale: scale.value}, {rotate: `${scale.value * 2 * Math.PI}rad`}]
    };
  });

  useEffect(() => {
    offset.value = withRepeat(withSpring(1), -1, true);
    scale.value = withRepeat(withSpring(2), -1, true);
  }, [])

  return(
    <>
      <Animated.View style={[styles.box, animate]} />
    </>
  )
}

const styles = StyleSheet.create({
  background_style: {
    width: devicewidth,
    height: deviceheight,
    backgroundColor: '#FFFFFF',
  },
  box: {
    width: 100,
    height: 100,
    //borderWidth: 2,
    borderRadius: deviceheight * 0.1,
    backgroundColor: 'blue',
    marginBottom: deviceheight * 0.2,
    marginTop: deviceheight * 0.4,
    marginLeft: devicewidth * 0.4,
    marginRight: devicewidth * 0.1,
  },
})

export default App;