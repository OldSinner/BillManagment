import {
  Center,
  Divider,
  Flex,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/logo.png';
export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Flex
      pos="sticky"
      flexDirection={'column'}
      left={0}
      w={isOpen ? '200px' : '60px'}
      h={'100vh'}
      borderRightRadius="30px"
      p={1}
      backgroundColor={useColorModeValue('gray.500', 'gray.900')}
      alignItems={'center'}
      justifyContent={'space-between'}
      transition="all 0.5s ease"
    >
      <Flex flexDir={'column'} justifyContent="center">
        <Center>{'<'}</Center>
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
          <NavItem text={'Home'} link="/dassh" isOpen={isOpen} />
          <NavItem text={'Home'} link="/dash" isOpen={isOpen} />
          <NavItem text={'Home'} isOpen={isOpen} />
          <NavItem text={'Home'} link="/dash" isOpen={isOpen} />
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
                Username
              </Text>
            </Center>
            <Center>
              <Text
                color={'gray.700'}
                fontWeight={400}
                fontSize={'lg'}
                cursor={'pointer'}
                onClick={() => setIsOpen(!isOpen)}
              >
                Wyloguj
              </Text>
            </Center>
          </>
        ) : (
          <Icon
            fontSize={'20px'}
            mb={5}
            cursor={'pointer'}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        )}
      </Flex>
    </Flex>
  );
}
export function NavItem({ text, icon, link, isOpen }) {
  return (
    <Link href={link}>
      <Flex
        boxShadow={' 0px 0px 45px -17px rgba(66, 68, 90, 1);'}
        p={10}
        w={isOpen ? '100%' : '20%'}
        borderRadius={'lg'}
        align={'center'}
        m={2}
        py={2}
        transition={'all 0.3s ease'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('green.400', 'green.400'),
        }}
      >
        <Center>
          <Icon fontSize={'20px'} as={icon} mr={isOpen ? 3 : 0} />
          {isOpen ? text : ''}
        </Center>
      </Flex>
    </Link>
  );
}
