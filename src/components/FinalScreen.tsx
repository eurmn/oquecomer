import {Divider, Text, VStack} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {Places} from '../places/places';

const AnimatedText = Animated.createAnimatedComponent(Text);

const CenterElement = (props: {
  presentationOver: boolean;
  onPresentationOver: () => void;
}) => {
  const textOpacityAnim = useRef(new Animated.Value(0)).current;
  const textScaleAnim = useRef(new Animated.Value(0.7)).current;
  const [options, setOptions] = useState({food: Places[0], iter: 0});

  const randomizeCurrentFood = (timeout: number) => {
    setTimeout(() => {
      setOptions({
        food: Places[options.iter % Places.length],
        iter: options.iter + 1,
      });
      // randomizeCurrentFood(timeout);
    }, timeout);
  };

  useEffect(() => {
    if (!props.presentationOver) {
      Animated.timing(textOpacityAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
      Animated.timing(textScaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1),
        useNativeDriver: false,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(textScaleAnim, {
            toValue: 0,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }).start();
          Animated.timing(textOpacityAnim, {
            toValue: 0,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }).start(() => {
            setTimeout(() => {
              props.onPresentationOver();
            }, 500);
          });
        }, 2000);
      });
    }
  });

  if (props.presentationOver) {
    if (options.iter < 80) {
      randomizeCurrentFood(50);
    }

    return (
      <>
        <Divider />
        <Text
          fontWeight="bold"
          fontSize={40}
          color="trueGray.800"
          w="full"
          textAlign="center">
          {options.food.name}
        </Text>
        <Divider />
      </>
    );
  } else {
    return (
      <AnimatedText
        fontWeight="bold"
        fontSize={32}
        color="trueGray.800"
        w="full"
        textAlign="center"
        style={{
          opacity: textOpacityAnim,
          transform: [{scale: textScaleAnim}],
        }}>
        A comida escolhida foi...
      </AnimatedText>
    );
  }
};

const FinalScreen = () => {
  const [presentationOver, setPresentationOver] = useState(false);

  return (
    <VStack px={10} w="full" flex={1} space={2} justifyContent="center">
      <CenterElement
        presentationOver={presentationOver}
        onPresentationOver={() => setPresentationOver(true)}
      />
    </VStack>
  );
};

export default FinalScreen;
