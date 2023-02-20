import {faBurger} from '@fortawesome/free-solid-svg-icons/faBurger';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Box, Text, VStack} from 'native-base';
import React from 'react';

const Logo = () => {
  return (
    <VStack my="5">
      <Box mx="auto">
        <FontAwesomeIcon icon={faBurger} size={50} color="#262626" />
      </Box>
      <Text
        fontWeight="bold"
        fontSize={40}
        color="trueGray.800"
        fontFamily="heading">
        oquecomer
      </Text>
    </VStack>
  );
};

export default Logo;
