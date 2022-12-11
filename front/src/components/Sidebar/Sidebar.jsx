import {
  Center,
  Divider,
  Flex,
  Icon,
  Image,
  Text,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import {
  HiArrowCircleLeft,
  HiArrowCircleRight,
  HiCurrencyDollar,
  HiOutlineHome,
  HiOutlineLogout,
  HiOutlineCog,
} from 'react-icons/hi';
import { GetUser, LogOut } from '../../Utils/Auth';
export function Sidebar({ isOpen, setIsOpen }) {
  var navigate = useNavigate();
  var user = GetUser();
  return (
    <Flex
      pos="sticky"
      flexDirection={'column'}
      left={0}
      w={isOpen ? '200px' : '60px'}
      h={'100vh'}
      maxH={'100vh'}
      borderRightRadius="30px"
      p={1}
      backgroundColor={useColorModeValue('gray.500', 'gray.900')}
      alignItems={'center'}
      justifyContent={'space-between'}
      transition="all 0.5s ease"
    >
      <Flex flexDir={'column'} justifyContent="center" overflowX={'hidden'}>
        <Center
          fontSize={'40px'}
          color={'green.400'}
          transition="all 0.5s ease"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          cursor="pointer"
        >
          {isOpen ? <HiArrowCircleLeft /> : <HiArrowCircleRight />}
        </Center>
        <Divider m={1} w={isOpen ? '100%' : '75%'} transition="all 0.5s ease" />

        <Center>
          <Image
            boxSize={isOpen ? '100px' : '50px'}
            objectFit="cover"
            src={logo}
            alt="Logo"
            m={1}
            transition="all 0.5s ease"
          />
        </Center>
        <Divider m={1} w={isOpen ? '100%' : '75%'} transition="all 0.5s ease" />
        <Flex
          flexDir="column"
          justifyContent={'center'}
          alignItems={'center'}
        ></Flex>
        <Flex flexDir={'column'} justifyContent="space-between">
          <NavItem
            text={'Home'}
            link="/dash"
            isOpen={isOpen}
            icon={HiOutlineHome}
          />
          <NavItem
            text={'Rachunki'}
            link="/list"
            isOpen={isOpen}
            icon={HiCurrencyDollar}
          />
          <NavItem text={'Raporty'} link="/raports"
            icon={HiCurrencyDollar}
            isOpen={isOpen} />
          <NavItem
            text={'Ustawienia'}
            link="/settings"
            isOpen={isOpen}
            icon={HiOutlineCog}
          />
          <NavItem text={'Home'} link="/dash" isOpen={isOpen} />

          <Divider w={isOpen ? '100%' : '75%'} transition="all 0.5s ease" />
        </Flex>
      </Flex>
      <Flex flexDir={'column'} justifyContent="center">
        {isOpen ? (
          <>
            <Center>
              <Text>Zalogowany jako:</Text>
            </Center>
            <Center>
              <Text color={'green.500'} fontWeight={400} fontSize={'xl'}>
                {user.UserName}
              </Text>
            </Center>
            <Center
              onClick={() => {
                LogOut();
                navigate('/login');
              }}
            >
              <Text
                color={'gray.700'}
                fontWeight={400}
                fontSize={'lg'}
                cursor={'pointer'}
              >
                Wyloguj
              </Text>
            </Center>
          </>
        ) : (
          <Icon
            fontSize={'20px'}
            mb={5}
            as={HiOutlineLogout}
            cursor={'pointer'}
            onClick={() => {
              LogOut();
              navigate('/login');
            }}
          />
        )}
      </Flex>
    </Flex>
  );
}
export function NavItem({ text, icon, link, isOpen }) {
  var navigate = useNavigate();
  return (
    <Flex
      boxShadow={' 0px 0px 45px -17px rgba(66, 68, 90, 1);'}
      p={10}
      w={isOpen ? '100%' : '20%'}
      borderRadius={'lg'}
      align={'center'}
      m={2}
      py={2}
      cursor={'pointer'}
      transition={'all 0.3s ease'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('green.400', 'green.400'),
      }}
      onClick={() => {
        navigate(link);
      }}
    >
      <Tooltip label={text} aria-label="A tooltip">
        <Center>
          <Icon fontSize={'20px'} as={icon} mr={isOpen ? 3 : 0} />
          {isOpen ? text : ''}
        </Center>
      </Tooltip>
    </Flex>
  );
}
