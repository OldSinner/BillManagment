import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Button,
  Heading,
  Text,
  Spinner,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Apischema } from '../../ApiSchema';
import axios from 'axios';

export default function Register() {
  const [invalidTable, setInvalidTable] = useState([false, false, false]);
  const [isLoading, setIsLoading] = useState(false);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const toast = useToast();
  var navigate = useNavigate();

  // useEffect(() => {
  //   if (IsLogged) navigate('/dash');
  // }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    var errorEmail = false;
    var errorPassword = false;
    var errorUsername = false;
    if (username.current.value.length < 3) {
      errorUsername = true;
      toast({
        title: 'Niepoprawna nazwa użytkownika.',
        description: 'Nazwa użytkownika musi zawierać conajmniej 3 znaki.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
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
    if (password.current.value.length < 8) {
      errorPassword = true;
      toast({
        title: 'Niepoprawne hasło.',
        description: 'Hasło musi zawierać conajmniej 8 znaków.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    setInvalidTable([errorUsername, errorEmail, errorPassword]);

    if (errorEmail || errorPassword || errorUsername) {
      setIsLoading(false);
      return;
    }
    axios
      .post(Apischema.register, {
        Email: email.current.value,
        FirstName: username.current.value,
        LastName: 'abc',
        Password: password.current.value,
      })
      .then(res => {
        setIsLoading(false);
        setTimeout(() => {
          navigate('/');
        }, 2000);
        toast({
          title: 'Rejestracja przebiegła pomyślnie.',
          description: 'Możesz się teraz zalogować.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(err => {
        setIsLoading(false);
        toast({
          title: 'Wystąpił błąd',
          description: err.response.data.errors[0],
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
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
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Zarejestruj się
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            aby zapanować nad swoimi finansami
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>Pseudonim</FormLabel>
                <Input
                  isInvalid={invalidTable[0]}
                  type="text"
                  focusBorderColor={'green.400'}
                  ref={username}
                />
              </FormControl>
            </Box>

            <FormControl id="email" isRequired>
              <FormLabel>Adres Email</FormLabel>
              <Input
                type="email"
                isInvalid={invalidTable[1]}
                focusBorderColor={'green.400'}
                ref={email}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  isInvalid={invalidTable[2]}
                  type={'password'}
                  focusBorderColor={'green.400'}
                  ref={password}
                />
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'green.400'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
                }}
                onClick={() => {
                  handleSubmit();
                }}
              >
                {isLoading ? <Spinner color="green.500" /> : 'Zarejestruj się'}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Jesteś już użytkownikiem?{' '}
                <Link href="/login" color={'green.400'}>
                  Zaloguj się
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
