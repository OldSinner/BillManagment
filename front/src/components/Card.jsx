import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Card({
  Title,
  Content,
  Color,
  maxW = '400px',
  w = '100%',
  maxH = '400px',
  h = '300px',
}) {
  return (
    <Center py={6}>
      <Box
        maxW={maxW}
        w={w}
        maxH={maxH}
        h={h}
        borderWidth="2px"
        bgColor={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={3}
        textAlign={'center'}
        borderColor={Color}
      >
        <Heading fontSize={'2xl'} fontFamily={'body'} textAlign={'left'}>
          {Title}
        </Heading>

        {Content}

        <Stack mt={8} direction={'row'} spacing={4}></Stack>
      </Box>
    </Center>
  );
}
