import {Box, Checkbox, Divider, HStack, Text, VStack} from 'native-base';
import React from 'react';
import AnimatedButton from './AnimatedButton';

const ConfigPopup = () => {
  return (
    <Box
      w="full"
      h="full"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      p={5}>
      <VStack
        space={3}
        bg="white"
        borderWidth={4}
        shadow={1}
        borderColor="indigo.600"
        p={5}
        rounded="2xl"
        w="full">
        <Text
          textAlign="center"
          color="trueGray.800"
          fontSize="2xl"
          fontWeight="semibold">
          Selecione as opções da comida.
        </Text>
        <Divider />
        <HStack justifyContent="space-evenly">
          <HStack space={2} alignItems="center" justifyContent="center">
            <Checkbox
              boxSize={5}
              accessibilityLabel="Caro"
              value="checkbox"
              color="trueGray.600"
            />
            <Text fontSize="xl">Caro</Text>
          </HStack>
          <HStack space={2} alignItems="center" justifyContent="center">
            <Checkbox
              boxSize={5}
              accessibilityLabel="Besteira"
              value="checkbox"
              color="trueGray.600"
            />
            <Text fontSize="xl">Besteira</Text>
          </HStack>
        </HStack>
        <Divider bg="green" color="green" />
        <AnimatedButton
          mx="auto"
          bg="indigo.500"
          rounded="xl"
          _text={{fontWeight: 'black', color: 'white'}}
          _pressed={{bg: 'indigo.500'}}>
          Adicionar
        </AnimatedButton>
      </VStack>
    </Box>
  );
};

export default ConfigPopup;
