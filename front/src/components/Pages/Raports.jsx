import { Button, Center, Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { forwardRef } from "react";
import Card from "../Card";
import DatePicker from 'react-datepicker';
import dayjs from "dayjs";
import { useState } from "react";
import axios from "axios";
import { Apischema } from "../ApiSchema";
import { GetUser } from "../../Utils/Auth";
const FileDownload = require('js-file-download');

const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Button onClick={onClick} ref={ref}>
        {value}
    </Button>
));
export default function Raports() {
    var user = GetUser();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = () => {
        setIsLoading(true)
        console.log(dayjs(startDate).format('YYYY-MM-DD'));
        console.log(dayjs(endDate).format('YYYY-MM-DD'));
        axios(
            {
                url: Apischema.pdf,
                params: { from: dayjs(startDate).format('YYYY-MM-DD'), to: dayjs(endDate).format('YYYY-MM-DD') },
                method: 'GET',
                headers: { Authorization: 'bearer ' + user.Token },
                responseType: 'blob'
            }
        ).then(
            response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Raport' + dayjs(endDate).format('YYYY-MM-DD') + '.pdf');
                document.body.appendChild(link);
                link.click();
            }
        ).catch(err => {
            toast({
                title: 'Nie udało się wygenerować raportu!',
                description: 'Spróbuj ponownie później',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }).finally(setIsLoading(false))
    }
    const [startDate, setStartDate] = useState(
        new Date(dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'))
    );
    const [endDate, setEndDate] = useState(
        new Date(dayjs().endOf('month').format('YYYY-MM-DD HH:mm:ss'))
    );
    return <>
        <Center >
            <Flex direction={'column'} justifyContent={'center'} alignItems={'center'}>
                <Text fontSize={'4xl'}>Raporty</Text>
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
                </Stack>
                <Button
                    {...isLoading ? 'isLoading' : ''}
                    colorScheme="teal"
                    onClick={() => { onSubmit() }}
                >Generuj Raport</Button>
            </Flex>
        </Center></>
}