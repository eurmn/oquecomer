import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  Box,
  Divider,
  HStack,
  IBoxProps,
  Input,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {Places} from '../places/places';
import AnimatedButton from './AnimatedButton';
import ConfigPopup from './ConfigPopup';
import PlaceItem from './PlaceItem';

const SelectStep = (
  props: IBoxProps & {
    question: string;
    onSwitch?: (value: boolean) => void;
    defaultValue?: boolean;
  },
) => {
  let [places, setPlaces] = useState(Places);
  let [newPlace, setNewPlace] = useState('');

  return (
    <Box flex={1} px={1} {...props}>
      <VStack space={4} px={2}>
        <Text
          fontWeight="semibold"
          fontSize={20}
          color="trueGray.800"
          textAlign="center">
          {props.question}
        </Text>
        <Divider bg="trueGray.800" />
        <ScrollView>
          <VStack space={3} flex={1} py={2}>
            <HStack alignItems="center" divider={<Divider h="4/5" />} space={2}>
              <Input
                onChangeText={text => setNewPlace(text)}
                mx={1}
                py={3}
                borderWidth={0}
                borderRadius="xl"
                bg="trueGray.100"
                flex={1}
                fontSize="xl"
                value={newPlace}
                _focus={{bg: 'trueGray.100'}}
              />
              <AnimatedButton
                onTouch={() => {
                  if (newPlace.length > 0) {
                    setPlaces([
                      {
                        name: newPlace,
                        id: places.length,
                        expensive: false,
                        junk: false,
                      },
                      ...places,
                    ]);
                    setNewPlace('');
                  }
                }}
                touchIntensity={4}
                bg="white"
                p={0}
                _pressed={{bg: 'white'}}>
                <FontAwesomeIcon icon={faPlus} size={30} color="#303030" />
              </AnimatedButton>
            </HStack>
            {places.map((place, i) => {
              return <PlaceItem delay={i * 50} place={place} key={place.id} />;
            })}
          </VStack>
        </ScrollView>
      </VStack>
      <ConfigPopup />
    </Box>
  );
};

export default SelectStep;
