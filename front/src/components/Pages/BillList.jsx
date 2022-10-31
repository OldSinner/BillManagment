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
  Text,
  Select,
  InputGroup,
  InputLeftElement,
  Input,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

import { useEffect, useRef, useState } from 'react';
import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  RiPencilLine,
  RiDeleteBinLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from 'react-icons/ri';
import { GetUser } from '../../Utils/Auth';
import { Apischema } from '../ApiSchema';

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <Button onClick={onClick} ref={ref}>
    {value}
  </Button>
));

const dayjs = require('dayjs');
export default function BillList() {
  const handleAmount = amount => {
    if (amount < 0) {
      return <Text color="red.500">{amount * -1}</Text>;
    }
    return <Text color="green.500">{amount}</Text>;
  };
  const handleIcon = bill => {
    if (bill.Amount < 0) return <RiArrowDownSLine></RiArrowDownSLine>;
    return <RiArrowUpSLine></RiArrowUpSLine>;
  };
  const changeToDot = value => {
    console.log(value);
    return value.replace(',', '.');
  };
  const [refresh, setRefresh] = useState(0);
  var user = GetUser();
  var categoryRef = useRef();
  var amountFromRef = useRef();
  var amountToRef = useRef();
  const [categories, setCategory] = useState();

  const [bills, setBills] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [startDate, setStartDate] = useState(
    new Date(dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'))
  );
  const [endDate, setEndDate] = useState(
    new Date(dayjs().endOf('month').format('YYYY-MM-DD HH:mm:ss'))
  );
  useEffect(() => {
    QueryCategory();
    QueryData();
  }, [refresh]);

  const QueryData = () => {
    axios
      .get(Apischema.bills, {
        params: {
          from: dayjs(startDate).format('YYYY-MM-DD'),
          to: dayjs(endDate).format('YYYY-MM-DD'),
          fromAmount: changeToDot(amountFromRef.current.value),
          toAmount: changeToDot(amountToRef.current.value),
          category: categoryRef.current.value,
        },
        headers: { Authorization: 'bearer ' + user.Token },
      })
      .then(res => {
        setBills(res.data.data);
      });
  };
  const QueryCategory = () => {
    axios
      .get(Apischema.category, {
        headers: { Authorization: 'bearer ' + user.Token },
      })
      .then(res => {
        setCategory(res.data.data);
      });
  };

  return (
    <Center>
      <BillAddModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        categories={categories}
        refresh={refresh}
        setRefresh={setRefresh}
      />
      <TableContainer w={'100%'}>
        <Table variant={'simple'}>
          <TableCaption>
            <Flex>
              <Button onClick={onOpen}>Dodaj Nowy Rachunek</Button>
              <Button
                ml={2}
                onClick={() => {
                  QueryData();
                }}
              >
                Odśwież
              </Button>
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
                  dateFormat="dd/MM/yyyy"
                />{' '}
              </Flex>
              <Flex flexDir={'column'}>
                <Text>Data do:</Text>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  customInput={<CustomInput />}
                  dateFormat="dd/MM/yyyy"
                />{' '}
              </Flex>
              <Flex flexDir={'column'} w={'200px'}>
                <Text>Kategoria</Text>
                <Select ref={categoryRef}>
                  <option value="ALL">Wszystkie</option>
                  {categories?.map(category => (
                    <option value={category.id}>{category.name}</option>
                  ))}
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
                  <Input ref={amountFromRef} />
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
                  <Input ref={amountToRef} />
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
            {bills?.map(bill => (
              <Tr>
                <Td>{bill.title}</Td>
                <Td></Td>
                <Td>
                  {' '}
                  <Flex flexDir={'row'}>
                    {handleAmount(bill.amount)}
                    {handleIcon(bill)}
                  </Flex>
                </Td>
                <Td>{bill.category.name}</Td>
                <Td>{dayjs(bill.CreatedDate).format('DD/MM/YYYY')}</Td>
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
            ))}
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

export function BillAddModal({
  isOpen,
  onOpen,
  onClose,
  categories,
  setRefresh,
  refresh,
}) {
  const [date, setDate] = useState(new Date());
  const amountRef = useRef();
  const nameRef = useRef();
  const categoryRef = useRef();
  const incomeRef = useRef();
  var user = GetUser();
  const toast = useToast();
  const handleAmount = val => {
    if (val < 0) {
      return val * -1;
    }
    if (incomeRef.current.value === 'outcome') {
      return val * -1;
    }
  };

  const HandleSubmit = () => {
    axios
      .post(
        Apischema.bills,
        {
          Title: nameRef.current.value,
          Amount: handleAmount(amountRef.current.value),
          CategoryId: categoryRef.current.value,
          Date: dayjs(date).format('YYYY-MM-DD'),
        },
        {
          headers: { Authorization: 'bearer ' + user.Token },
        }
      )
      .then(res => {
        console.log(res);
        toast({
          title: 'Dodano rachunek!',
          description: 'Nowy rachunek został dodany.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setRefresh(refreshtToken => refreshtToken + 1);
        onClose();
      })
      .catch(err => {
        console.log(err);
        toast({
          title: 'Wystąpił błąd!',
          description: err.response.data.errors[0],
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodaj Rachunek</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Nazwa rachunku</Text>
          <Input ref={nameRef}></Input>
          <Text>Kwota</Text>
          <Input isNumeric ref={amountRef}></Input>
          <Text>Data</Text>
          <DatePicker
            selected={date}
            onChange={date => setDate(date)}
            customInput={<CustomInput />}
            dateFormat="dd/MM/yyyy"
          />{' '}
          <Text>Kategoria</Text>
          <Select ref={categoryRef}>
            {categories?.map(category => (
              <option value={category.id}>{category.name}</option>
            ))}
          </Select>
          <Text>Typ rachunku</Text>
          <Select ref={incomeRef}>
            <option selected value={'outcome'}>
              Wydatek
            </option>
            <option value={'income'}>Przychód</option>
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="green"
            mr={3}
            onClick={() => {
              HandleSubmit();
            }}
          >
            Dodaj
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Anuluj
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
