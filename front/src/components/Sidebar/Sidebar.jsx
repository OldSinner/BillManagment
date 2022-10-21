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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Flex
      pos="sticky"
      flexDirection={'column'}
      left={0}
      w={'200px'}
      h={'100vh'}
      borderRadius="20px"
      boxShadow="13px 14px 24px -21px rgba(66, 68, 90, 1)"
      p={1}
      backgroundColor={useColorModeValue('gray.500', 'gray.900')}
      alignItems={'center'}
    >
      <Flex flexDir={'column'} justifyContent="center">
        <Center>{'<'}</Center>
        <Image boxSize="100px" objectFit="cover" src={logo} alt="Logo" m={1} />
        <Divider m={1} />
        <Flex flexDir="column" justifyContent={'center'} alignItems={'center'}>
          <Center>
            <Text>Zalogowany jako:</Text>
          </Center>
          <Center>
            <Text
              color={useColorModeValue('gray.100', 'green.500')}
              fontWeight={400}
              fontSize={'xl'}
            >
              Username
            </Text>
          </Center>
        </Flex>
      </Flex>
      <Flex flexDir={'column'} justifyContent="space-between">
        <NavItem text={'Home'} link="/dash" isOpen={isOpen} />
        <NavItem text={'Home'} link="/dash" isOpen={isOpen} />
        <NavItem text={'Home'} link="/dash" isOpen={isOpen} />
        <NavItem text={'Home'} link="/dash" isOpen={isOpen} />
        <NavItem text={'Home'} link="/dash" isOpen={isOpen} />

        <Divider w={'100%'} />
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
