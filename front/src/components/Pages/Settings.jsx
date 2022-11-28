import {
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/card';
import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Apischema } from '../ApiSchema';
import { GetUser } from '../../Utils/Auth';
export default function Settings() {
  const oldPassword = useRef();
  const newPassword = useRef();
  const newPasswordRepeat = useRef();
  const usernameRef = useRef();

  const toast = useToast();
  var user = GetUser();

  function getFreshValidate() {
    return {
      oldPassword: {
        leng: false,
        lengMsg: 'Hasło musi mieć conajmniej 8 znaki',
        correct: false,
        correctMsg: 'Hasło jest niepoprawne',
      },
      newPassword: {
        leng: false,
        lengMsg: 'Hasło musi być pomięzdy 8 a 32 znaki',
        repeat: false,
        repeatMsg: 'Hasła nie są takie same',
      },
      repeatPassword: {
        repeat: false,
        repeatMsg: 'Hasła nie są takie same',
      },
    };
  }
  const [validateState, setValidate] = useState(getFreshValidate());
  const [passChangeLoading, setPassChangeLoading] = useState(false);

  const changeUserNameSubmit = () => {
    axios
      .post(
        Apischema.changeUsername,
        usernameRef.current.value,
        {
          headers: { Authorization: 'bearer ' + user.Token, 'Content-Type': 'application/json' },
        }
      )
      .then(res => {
        toast({
          title: 'Nazwa użytkownika została zmieniona.',
          description:
            'Twoja nazwa użytkownika została zmieniona. Zaloguj się ponownie.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(err => {
        toast({
          title: 'Nie udało się zmienić nazwy użytkownika.',
          description: 'Twoja nazwa użytkownika nie została zmieniona.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setPassChangeLoading(false);
      });
  };

  const changePasswordSubmit = () => {
    setPassChangeLoading(true);
    if (newPassword.current.value !== newPasswordRepeat.current.value) {
      var validate = getFreshValidate();
      validate.newPassword.repeat = true;
      validate.repeatPassword.repeat = true;
      setValidate(validate);
      setPassChangeLoading(false);
      return;
    }
    if (newPassword.current.value.length < 8) {
      var validatenp = getFreshValidate();
      validatenp.newPassword.leng = true;
      setValidate(validatenp);
      setPassChangeLoading(false);
      return;
    }
    if (oldPassword.current.value.length < 8) {
      var validateop = getFreshValidate();
      validateop.oldPassword.leng = true;
      setValidate(validateop);
      setPassChangeLoading(false);
      return;
    }

    axios
      .post(
        Apischema.changePassword,
        {
          OldPassword: oldPassword.current.value,
          NewPassword: newPassword.current.value,
        },
        {
          headers: { Authorization: 'bearer ' + user.Token },
        }
      )
      .then(res => {
        toast({
          title: 'Hasło zostało zmienione',
          description: 'Twoje hasło zostało zmienione',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(err => {
        if (err.response.status !== 400) {
          console.log(err);
          toast({
            title: 'Wystąpił błąd',
            description: 'Wystąpił błąd podczas zmiany hasła',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
        toast({
          title: 'Wystąpił błąd',
          description: err.response.data.errors[0],
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
    setPassChangeLoading(false);
  };
  return (
    <Center>
      <Card
        direction={{ base: 'column' }}
        overflow="hidden"
        variant="outline"
        w={{ base: '90%', sm: '70%' }}
        m={10}
      >
        <CardHeader fontSize={22}>Ustawienia</CardHeader>
        <Divider />
        <CardBody>
          <Flex direction={'column'}>
            <Text fontSize={22}>Zmiana Hasła</Text>
            <FormControl>
              <FormLabel>Stare Hasło</FormLabel>
              <Input type="password" ref={oldPassword} />
            </FormControl>
            <FormControl
              isInvalid={
                validateState.newPassword.leng ||
                validateState.newPassword.repeat
              }
            >
              <FormLabel>Nowe hasło</FormLabel>
              <Input type="password" ref={newPassword} />
              <FormErrorMessage>
                {validateState.newPassword.repeat
                  ? validateState.newPassword.repeatMsg
                  : null}
                {validateState.newPassword.leng
                  ? validateState.newPassword.lengMsg
                  : null}
              </FormErrorMessage>
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={validateState.repeatPassword.repeat}>
              <FormLabel>Powtórz nowe hasło</FormLabel>
              <Input type="password" ref={newPasswordRepeat} />
              <FormErrorMessage>
                {validateState.repeatPassword.repeatMsg}
              </FormErrorMessage>
            </FormControl>
            <Button
              isLoading={passChangeLoading}
              w={{ sm: '100%', xl: '20%' }}
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={() => {
                changePasswordSubmit();
              }}
            >
              Zatwierdź
            </Button>
          </Flex>
        </CardBody>
        <Divider />
        <CardBody>
          <Flex direction={'column'}>
            <Text fontSize={22}>Zmiana Pseudonimu</Text>
            <FormControl>
              <FormLabel>Nowy Pseudonim</FormLabel>
              <Input type="text" ref={usernameRef} />
            </FormControl>
            <Button
              w={{ sm: '100%', xl: '20%' }}
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={() => {
                changeUserNameSubmit();
              }}
            >
              Zatwierdź
            </Button>
          </Flex>
        </CardBody>
        <CardFooter>Po zatwierdzeniu, zmian nie można cofnąć!</CardFooter>
      </Card>
    </Center>
  );
}
