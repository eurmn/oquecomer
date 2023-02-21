import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  Divider,
  extendTheme,
  HStack,
  NativeBaseProvider,
  StatusBar,
  Text,
  VStack,
} from 'native-base';
import React, {useRef, useState} from 'react';
import {Animated, BackHandler, Easing} from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import AnimatedButton from './src/components/AnimatedButton';
import BinaryStep from './src/components/BinaryStep';
import FinalScreen from './src/components/FinalScreen';
import Logo from './src/components/Logo';
import SelectStep from './src/components/SelectStep';

const AnimatedVStack = Animated.createAnimatedComponent(VStack);

SystemNavigationBar.navigationShow();
SystemNavigationBar.setNavigationColor('transparent');

const theme = extendTheme({
  fontConfig: {
    Inter: {
      100: {
        normal: 'Inter-Thin',
      },
      200: {
        normal: 'Inter-ExtraLight',
      },
      300: {
        normal: 'Inter-Light',
      },
      400: {
        normal: 'Inter-Regular',
      },
      500: {
        normal: 'Inter-Medium',
      },
      600: {
        normal: 'Inter-SemiBold',
      },
      700: {
        normal: 'Inter-Bold',
      },
      800: {
        normal: 'Inter-ExtraBold',
      },
      900: {
        normal: 'Inter-Black',
      },
    },
    Roboto: {
      100: {
        normal: 'Roboto-Thin',
      },
      200: {
        normal: 'Roboto-Thin',
      },
      300: {
        normal: 'Roboto-Light',
      },
      400: {
        normal: 'Roboto-Regular',
      },
      500: {
        normal: 'Roboto-Medium',
      },
      600: {
        normal: 'Roboto-Medium',
      },
      700: {
        normal: 'Roboto-Bold',
      },
      800: {
        normal: 'Roboto-Bold',
      },
      900: {
        normal: 'Roboto-Black',
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    body: 'Roboto',
    heading: 'Inter',
  },
});

let userOptions: {
  allowJunk?: boolean;
  allowExpensive?: boolean;
  placesToExclude?: number[];
  newPlaces?: string[];
} = {};

const CurrentPage = (props: {step: number}) => {
  switch (props.step) {
    case 1:
      return (
        <>
          <BinaryStep
            defaultValue={false}
            question="Você pode gastar dinheiro hoje?"
            onSwitch={v => (userOptions.allowExpensive = v)}
          />
          <Divider w="3/4" />
          <BinaryStep
            question="Você quer comer besteira hoje?"
            onSwitch={v => (userOptions.allowJunk = v)}
          />
        </>
      );
    case 2:
      return (
        <SelectStep question="Personalize quais estabelecimentos poderão ser escolhidos." />
      );
    case 3:
      return <FinalScreen />;
    default:
      return <></>;
  }
};

const App = () => {
  const startPaddingAnim = (value: number) => {
    Animated.timing(paddingAnim, {
      toValue: value,
      duration: 600,
      easing: Easing.elastic(1),
      useNativeDriver: false,
    }).start();
  };

  const goBack = () => {
    if (step === 1) {
      startPaddingAnim(150);
    }
    setStep(step === 0 ? 0 : step - 1);
  };

  const [step, setStep] = useState(0);

  BackHandler.addEventListener('hardwareBackPress', () => {
    goBack();
    return true;
  });
  const paddingAnim = useRef(new Animated.Value(150)).current;

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <AnimatedVStack
        bg="white"
        alignItems="center"
        justifyContent="space-between"
        h="full"
        w="full"
        style={{paddingTop: paddingAnim, paddingBottom: step === 0 ? 150 : 50}}
        space={2}
        overflow="hidden">
        <Logo />
        <CurrentPage step={step} />
        <Divider opacity={0} />
        <HStack
          w="full"
          px={5}
          justifyContent={step === 0 ? 'center' : 'space-between'}>
          <AnimatedButton
            display={step === 0 ? 'none' : undefined}
            onTouch={() => goBack()}
            bg="white"
            rounded="xl"
            px={5}
            py={2}
            _pressed={{bg: 'white'}}>
            <HStack alignItems="center">
              <FontAwesomeIcon icon={faAngleLeft} color="#262626" />
              <Text fontSize="xl" color="trueGray.800" fontWeight="bold">
                &nbsp;Voltar
              </Text>
            </HStack>
          </AnimatedButton>
          <AnimatedButton
            onTouch={() => {
              setStep(step === 3 ? 0 : step + 1);
              startPaddingAnim(50);
            }}
            bg="indigo.500"
            rounded="xl"
            px={5}
            py={2}
            _pressed={{bg: 'indigo.500'}}>
            <HStack alignItems="center">
              <Text fontSize="xl" color="white" fontWeight="bold">
                {step === 0 ? 'Iniciar' : step === 3 ? 'Finalizar' : 'Próximo'}
                &nbsp;
              </Text>
              <FontAwesomeIcon
                icon={faAngleRight}
                color="white"
                style={{display: step === 3 ? 'none' : 'flex'}}
              />
            </HStack>
          </AnimatedButton>
        </HStack>
      </AnimatedVStack>
    </NativeBaseProvider>
  );
};

export default App;
