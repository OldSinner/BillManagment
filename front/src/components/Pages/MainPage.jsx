import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import AboutUs from '../HeroComponents/AboutUs';
import AboutApp from '../HeroComponents/AboutApp';
import Timeline from '../HeroComponents/Timeline';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function MainPage() {
  return (
    <>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'green.400',
                  zIndex: -1,
                }}
              >
                BillyIO
              </Text>
              <br />{' '}
              <Text color={'green.400'} as={'span'}>
                Aplikacja Finansowa
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              Aplikacja wykonana na rzecz projektu "Zespołowy Projekt Informatyczny", na Uniwerystecie Kazimierza Wielkiego w Bydgoszczy
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'green.400'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
                }}
                onClick={() => {
                  window.location.href = '/login';
                }}
              >
                Zaloguj się
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://i.imgur.com/nuK6uVC.jpeg'
            }
          />
        </Flex>
      </Stack>
      <Divider />
      <AboutApp />
      <Divider />
      <AboutUs />
      <Divider />
      <Timeline />
      <Divider></Divider>
    </>
  );
}
