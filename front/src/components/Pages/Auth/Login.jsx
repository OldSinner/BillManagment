import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Center,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [invalidTable, setInvalidTable] = useState([false, false]);
  const [isLoading, setIsLoading] = useState(false);
  const email = useRef();
  const password = useRef();
  var navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = () => {
    setIsLoading(true);
    var errorEmail = false;
    var errorPassword = false;

    if (email.current.value.length < 3) {
      errorEmail = true;
      toast({
        title: 'Niepoprawny adres email.',
        description: 'Adres email musi zawierać conajmniej 3 znaki.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    if (!email.current.value.includes('@')) {
      errorEmail = true;
      toast({
        title: 'Niepoprawny adres email.',
        description: 'Adres email musi zawierać znak @.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    if (password.current.value.length < 6) {
      errorPassword = true;
      toast({
        title: 'Niepoprawne hasło.',
        description: 'Hasło musi zawierać conajmniej 6 znaków.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }

    setInvalidTable([errorEmail, errorPassword]);

    if (errorEmail || errorPassword) {
      setIsLoading(false);
      return;
    }
  };
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Zaloguj się</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            a my przygotujemy twoje <Link color={'green.400'}>rachunki</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Adres Email</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Hasło</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Zapamiętaj mnie</Checkbox>
              </Stack>
              <Button
                bg={'green.400'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
                }}
              >
                Zaloguj się
              </Button>
            </Stack>
            <Text fontSize={'lg'} color={'gray.600'} align={'center'}>
              Nie masz konta?{' '}
              <Link href="/register" color={'green.400'}>
                Zarejestruj się
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
