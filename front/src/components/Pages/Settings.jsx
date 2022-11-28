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
} from '@chakra-ui/react';
import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/card';
import { useRef } from 'react';
import { useState } from 'react';
export default function Settings() {
  var oldPassword = useRef();
  var newPassword = useRef();
  var newPasswordRepeat = useRef();

  function getFreshValidate() {
    return {
      oldPassword: {
        leng: false,
        lengMsg: 'Hasło musi mieć conajmniej 8 znaków',
        correct: false,
        correctMsg: 'Hasło jest niepoprawne',
      },
      newPassword: {
        leng: false,
        lengMsg: 'Hasło musi mieć conajmniej 8 znaków',
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

  const changePasswordSubmit = () => {
    if (newPassword.current.value !== newPasswordRepeat.current.value) {
      var validate = getFreshValidate();
      validate.newPassword.repeat = true;
      validate.repeatPassword.repeat = true;
      setValidate(validate);
      return;
    }
    if (newPassword.current.value.length < 8) {
      var validatenp = getFreshValidate();
      validatenp.newPassword.leng = true;
      setValidate(validatenp);
      return;
    }
    if (oldPassword.current.value.length < 8) {
      var validateop = getFreshValidate();
      validateop.oldPassword.leng = true;
      setValidate(validateop);
      return;
    }

    var req = {
      OldPassword: oldPassword.current.value,
      NewPassword: newPassword.current.value,
    };
    console.log(req);
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
              <Input type="password" />
            </FormControl>
            <Button
              w={{ sm: '100%', xl: '20%' }}
              mt={4}
              colorScheme="teal"
              type="submit"
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
