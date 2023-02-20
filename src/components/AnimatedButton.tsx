import {Button, IButtonProps} from 'native-base';
import React, {useRef} from 'react';
import {Animated, Easing} from 'react-native';

const _animatedButton = Animated.createAnimatedComponent(Button);

const AnimatedButton = (
  props: IButtonProps & {onTouch?: () => void; touchIntensity?: number},
) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <_animatedButton
      {...props}
      style={{transform: [{scale: scaleAnim}]}}
      onTouchStart={() => {
        Animated.timing(scaleAnim, {
          toValue: 1 - (props.touchIntensity || 1) * 0.07,
          duration: 70,
          easing: Easing.in(Easing.ease),
          useNativeDriver: false,
        }).start();
      }}
      onTouchEnd={() => {
        Animated.timing(scaleAnim, {
          toValue: 1 - (props.touchIntensity || 1) * 0.07,
          duration: 70,
          easing: Easing.in(Easing.ease),
          useNativeDriver: false,
        }).start(() => {
          props.onTouch?.call(props.onTouch);
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 70,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
          }).start();
        });
      }}
    />
  );
};

export default AnimatedButton;
