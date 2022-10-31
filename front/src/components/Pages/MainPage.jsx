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
import PersonCard from '../PersonCard';
import AvatarMaks from '../../Assets/maksiuavatar.png';
import AvatarSebastian from '../../Assets/seba.png';
import AvatarMaja from '../../Assets/maja.png';
import AvatarAdrian from '../../Assets/adi.png';
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
              Zarządzaj swoimi finansami w prosty i intuicyjny sposób, dzięki
              naszej aplikacji.
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
                Dołącz do nas
              </Button>
              <Button rounded={'full'}>Kim jesteśmy</Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
          />
        </Flex>
      </Stack>
      <Divider />
      <Stack direction="row">
        <PersonCard
          name={'Maksymilian Przysiwek'}
          desc={
            'Lider projektu, interesuję się programowaniem, tworzeniem stron internetowych od stony backendu, uwielbiany przez wszystkich, UWIELBIA koty. Uważa je za rasę nadrzędną i czeka na powrót wielkiego Anubisa.'
          }
          avatar={AvatarMaks}
        />
        <PersonCard
          name={'Maja Lisowska'}
          desc={
            'Interesuje się grafiką komputerową i jazdę konną, lubi taniec. Miłośniczka kotów.'
          }
          avatar={AvatarMaja}
        />
        <PersonCard
          name={'Adrian Żabiński'}
          desc={
            'Interesuje się programowaniem, japońskimi samochodami i modyfikowaniem samochodów, w przeciwieństwie do reszty grupy preferuje psy.'
          }
          avatar={AvatarAdrian}
        />
        <PersonCard
          name={'Sebastian Michalski'}
          desc={
            'Interesuje się tworzeniem gier, tworzeniem stron internetowych od strony frontendu, w wolnym czasie lubi grać.'
          }
          avatar={AvatarSebastian}
        />
      </Stack>
    </>
  );
}
