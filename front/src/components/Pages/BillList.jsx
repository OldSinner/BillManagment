import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tab,
  Center,
  Button,
  Box,
  Text,
  Select,
  InputGroup,
  InputLeftElement,
  Input,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';

import { useState } from 'react';
import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';
export default function BillList() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button onClick={onClick} ref={ref}>
      {value}
    </Button>
  ));
  return (
    <Center>
      <TableContainer w={'100%'}>
        <Table variant={'simple'}>
          <TableCaption>
            <Flex>
              <Button>Dodaj Nowy Rachunek</Button>
            </Flex>
          </TableCaption>
          <Thead>
            <Stack direction={['column', 'row']} spacing="24px" m={5}>
              <Flex flexDir={'column'}>
                <Text>Data od:</Text>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  customInput={<CustomInput />}
                />{' '}
              </Flex>
              <Flex flexDir={'column'}>
                <Text>Data do:</Text>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  customInput={<CustomInput />}
                />{' '}
              </Flex>
              <Flex flexDir={'column'} w={'200px'}>
                <Text>Kategoria</Text>
                <Select>
                  <option value="all">Wszystkie</option>
                </Select>
              </Flex>
              <Flex flexDir={'column'} w={'200px'}>
                <Text>Kwota od</Text>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="$"
                  />
                  <Input />
                </InputGroup>
              </Flex>
              <Flex flexDir={'column'} w={'200px'}>
                <Text>Kwota do</Text>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="$"
                  />
                  <Input />
                </InputGroup>
              </Flex>
            </Stack>
            <Tr>
              <Th>Nazwa Rachunki</Th>
              <Th isNumeric>Kwota</Th>
              <Th>Kategoria</Th>
              <Th>Data Dodania</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Play</Td>
              <Td isNumeric>1.000,00</Td>
              <Td>Jedzenei</Td>
              <Td>29.10.2022</Td>
              <Td fontSize={'20px'}>
                <Flex>
                  <Text
                    m={1}
                    fontSize={'24px'}
                    cursor="pointer"
                    _hover={{
                      color: 'green.400',
                    }}
                  >
                    <RiPencilLine />
                  </Text>
                  <Text
                    m={1}
                    cursor="pointer"
                    fontSize={'24px'}
                    _hover={{
                      color: 'green.400',
                    }}
                  >
                    <RiDeleteBinLine />
                  </Text>
                </Flex>
              </Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Nazwa Rachunki</Th>
              <Th isNumeric>Kwota</Th>
              <Th>Kategoria</Th>
              <Th>Data Dodania</Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Center>
  );
}
{
}
