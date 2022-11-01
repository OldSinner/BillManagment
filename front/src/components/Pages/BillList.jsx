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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
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
const handleAmount = amount => {
  if (amount < 0) {
    return <Text color="red.500">{amount}</Text>;
  }
  return <Text color="green.500">{amount}</Text>;
};

const changeToDot = value => {
  return value.replace(',', '.');
};

const dayjs = require('dayjs');
export default function BillList() {
  //Data
  var user = GetUser();
  //Refs
  var categoryRef = useRef();
  var amountFromRef = useRef();
  var amountToRef = useRef();
  //states
  const [categories, setCategory] = useState();
  const [refresh, setRefresh] = useState(0);
  const [bills, setBills] = useState();
  const [idtoDelete, setIdToDelete] = useState();

  const [startDate, setStartDate] = useState(
    new Date(dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'))
  );
  const [endDate, setEndDate] = useState(
    new Date(dayjs().endOf('month').format('YYYY-MM-DD HH:mm:ss'))
  );
  //Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Effects
  useEffect(() => {
    QueryCategory();
    QueryData();
  }, [refresh]);

  //Queries
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

  //Render
  return (
    <>
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
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
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
                <Th>Kwota</Th>
                <Th>Kategoria</Th>
                <Th>Data Dodania</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {bills?.map(bill => (
                <Tr key={bill.id}>
                  <Td>{bill.title}</Td>
                  <Td>
                    {' '}
                    <Flex flexDir={'row'}>{handleAmount(bill.amount)}</Flex>
                  </Td>
                  <Td>{bill.category.name}</Td>
                  <Td>{dayjs(bill.createdDate).format('DD/MM/YYYY')}</Td>
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
                        <BillEditModal
                          categories={categories}
                          setRefresh={setRefresh}
                          bill={bill}
                        />
                      </Text>
                      <Text
                        m={1}
                        cursor="pointer"
                        fontSize={'24px'}
                        _hover={{
                          color: 'green.400',
                        }}
                      >
                        <BillDeleteModal
                          user={user}
                          setRefresh={setRefresh}
                          id={bill.id}
                        ></BillDeleteModal>
                      </Text>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Nazwa Rachunki</Th>
                <Th>Kwota</Th>
                <Th>Kategoria</Th>
                <Th>Data Dodania</Th>
                <Th></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Center>
    </>
  );
}
export function BillDeleteModal({ user, setRefresh, id }) {
  const toast = useToast();

  const handleDelete = () => {
    axios
      .delete(Apischema.bills + '/' + id, {
        headers: { Authorization: 'bearer ' + user.Token },
      })
      .then(res => {
        toast({
          title: 'Raachunek został usunięty 👍🏻',
          description: 'Żegnaj rachunku! 👋🏻👋🏻',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setRefresh(refreshtToken => refreshtToken + 1);
        onClose();
      })
      .catch(err => {
        toast({
          title: '❗️ Wystąpił błąd! ❗️',
          description: err.response.data.errors[0],
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  return (
    <>
      <RiDeleteBinLine onClick={onOpen} />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Usuwanie rachunku
            </AlertDialogHeader>

            <AlertDialogBody>
              Jesteś pewien? Tej akcji nie można cofnąć!
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Anuluj
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Usuń rachunek
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
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
    console.log(val);
    if (val < 0) {
      return val * -1;
    }
    if (incomeRef.current.value === 'outcome') {
      return val * -1;
    }
    return val;
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
        toast({
          title: 'Dodano rachunek! 🛴',
          description: 'Nowy rachunek został dodany. ❤️‍🔥',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setRefresh(refreshtToken => refreshtToken + 1);
        onClose();
      })
      .catch(err => {
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
          <Input ref={amountRef}></Input>
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
              <option defaultValue key={category.id} value={category.id}>
                {category.name}
              </option>
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
export function BillEditModal({ categories, setRefresh, bill }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [date, setDate] = useState(new Date(bill.createdDate));
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
    if (incomeRef?.current?.value === 'outcome') {
      return val * -1;
    }
    return val;
  };

  const HandleSubmit = () => {
    console.log(dayjs(date).format('YYYY-MM-DD'));
    axios
      .put(
        Apischema.bills,
        {
          Id: bill.id,
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
        toast({
          title: 'Zedytowano Rachunek! 🛴',
          description: 'Nowy rachunek już jest u nas!. ❤️‍🔥',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setRefresh(refreshtToken => refreshtToken + 1);
        onClose();
      })
      .catch(err => {
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
    <>
      <RiPencilLine onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edytuj Rachunek</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Nazwa rachunku</Text>
            <Input ref={nameRef} defaultValue={bill.title}></Input>
            <Text>Kwota</Text>
            <Input
              ref={amountRef}
              defaultValue={handleAmount(bill.amount)}
            ></Input>
            <Text>Data</Text>
            <DatePicker
              selected={date}
              onChange={date => {
                console.log(date);
                setDate(date);
              }}
              customInput={<CustomInput />}
              dateFormat="dd/MM/yyyy"
            />{' '}
            <Text>Kategoria</Text>
            <Select ref={categoryRef} defaultValue={bill.category.id}>
              {categories?.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Text>Typ rachunku</Text>
            <Select
              ref={incomeRef}
              defaultValue={bill.amount < 0 ? 'outcome' : 'income'}
            >
              <option value={'outcome'}>Wydatek</option>
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
              Edytuj
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Anuluj
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
