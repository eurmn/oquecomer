import {faGear, faPlus} from '@fortawesome/free-solid-svg-icons';
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
import {Place, Places} from '../places/places';
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
  const emptyPlace = {
    name: '',
    expensive: false,
    junk: false,
    id: -1,
  };

  let [places, setPlaces] = useState(Places);
  let [newPlace, setNewPlace] = useState<Place>(emptyPlace);
  let [settingsVisible, setSettingsVisible] = useState(false);

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
            <HStack alignItems="center" space={2}>
              <Input
                onChangeText={text => setNewPlace({...newPlace, name: text})}
                mx={1}
                py={3}
                borderWidth={0}
                borderRadius="xl"
                bg="trueGray.100"
                flex={1}
                fontSize="xl"
                value={newPlace.name}
                _focus={{bg: 'trueGray.100'}}
              />
              <Divider h="2/3" orientation="vertical" />
              <AnimatedButton
                onTouch={() => {
                  if (newPlace.name.length > 0) {
                    setPlaces([{...newPlace, id: places.length}, ...places]);
                    places.unshift({...newPlace, id: places.length});
                    setNewPlace(emptyPlace);
                  }
                }}
                touchIntensity={2}
                p={0}
                bg="white"
                _pressed={{bg: 'white'}}>
                <FontAwesomeIcon icon={faPlus} size={27} color="#262626" />
              </AnimatedButton>
            </HStack>
            {places.map((place, i) => {
              return <PlaceItem delay={i * 50} place={place} key={place.id} />;
            })}
          </VStack>
        </ScrollView>
      </VStack>
    </Box>
  );
};

export default SelectStep;
