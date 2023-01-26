import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function PersonCard({ name, link, avatar, desc, badges }) {
  return (
    <Center py={6} >
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
        height='300px'
        m={2}
      >
        <Avatar
          size={'xl'}
          src={avatar}
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={'2xl'}>
          {name}
        </Heading>
        {link ? (
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            {link}
          </Text>
        ) : (
          ''
        )}

        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          {desc}
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          {badges
            ? badges.map(badge => {
              <Badge px={2} py={1} bg={'gray.800'} fontWeight={'400'}>
                {badge}
              </Badge>;
            })
            : ''}
        </Stack>
      </Box>
    </Center>
  );
}
