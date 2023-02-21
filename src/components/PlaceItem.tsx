import {Checkbox, Divider, HStack, Pressable, Text} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';
import {Place} from '../places/places';

const _animatedPressable = Animated.createAnimatedComponent(Pressable);

const PlaceCheckbox = (props: {place: Place; delay: number}) => {
  let [isChecked, setIsChecked] = useState(true);

  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.elastic(1),
        useNativeDriver: false,
      }).start();
    }, props.delay);
  });

  return (
    <_animatedPressable
      onTouchStart={() =>
        Animated.timing(scaleAnim, {
          toValue: 0.97,
          easing: Easing.inOut(Easing.ease),
          duration: 100,
          useNativeDriver: false,
        }).start()
      }
      onTouchEnd={() => {
        scaleAnim.stopAnimation(value => {
          Animated.timing(scaleAnim, {
            toValue: 0.97,
            duration: ((value - 0.97) / 0.03) * 100,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }).start(() => {
            setIsChecked(!isChecked);
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 100,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: false,
            }).start();
          });
        });
      }}
      onTouchCancel={() => {
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }).start();
      }}
      style={{transform: [{scale: scaleAnim}]}}>
      <HStack
        shadow={isChecked ? 0 : 1}
        space={5}
        borderWidth={2}
        borderColor={isChecked ? 'emerald.500' : 'white'}
        divider={<Divider />}
        bg={'white'}
        px={4}
        py={3}
        alignItems="center"
        rounded="xl"
        mx={1}
        style={{shadowColor: 'rgba(0,0,0,0.7)'}}>
        <Checkbox
          accessibilityLabel={props.place.name}
          value={props.place.id.toString()}
          isChecked={isChecked}
          _checked={{
            bg: 'emerald.500',
            borderColor: 'emerald.500',
          }}
          _icon={{color: 'white'}}
        />
        <Text
          fontSize={24}
          fontWeight="bold"
          color={'trueGray.800'}
          flex={1}
          textAlign="center">
          {props.place.name}
        </Text>
      </HStack>
    </_animatedPressable>
  );
};

export default PlaceCheckbox;
