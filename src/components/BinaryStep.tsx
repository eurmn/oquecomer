import {HStack, Text, VStack} from 'native-base';
import {IVStackProps} from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import React, {useState} from 'react';
import AnimatedButton from './AnimatedButton';

const BinaryStep = (
  props: IVStackProps & {
    question: string;
    onSwitch?: (value: boolean) => void;
    defaultValue?: boolean;
  },
) => {
  const [value, setValue] = useState(props.defaultValue ?? true);

  return (
    <VStack space={3} px={2} {...props} justifyContent="center">
      <Text fontWeight="semibold" fontSize={20} color="trueGray.800">
        {props.question}
      </Text>
      <HStack space={1} mx="auto">
        <AnimatedButton
          rounded="xl"
          py={1}
          px={5}
          bg={value ? 'indigo.500' : 'white'}
          _pressed={{bg: value ? 'indigo.500' : 'white'}}
          onTouch={() => {
            setValue(true);
            props.onSwitch?.call(props.onSwitch, true);
          }}>
          <Text
            fontSize="lg"
            color={value ? 'white' : 'trueGray.800'}
            justifyContent="center"
            fontWeight="bold">
            Sim
          </Text>
        </AnimatedButton>
        <AnimatedButton
          rounded="xl"
          py={1}
          px={5}
          bg={value ? 'white' : 'indigo.500'}
          _pressed={{bg: value ? 'white' : 'indigo.500'}}
          onTouch={() => {
            setValue(false);
            props.onSwitch?.call(props.onSwitch, false);
          }}>
          <Text
            fontSize="lg"
            color={value ? 'trueGray.800' : 'white'}
            justifyContent="center"
            fontWeight="bold">
            Não
          </Text>
        </AnimatedButton>
      </HStack>
    </VStack>
  );
};

export default BinaryStep;
