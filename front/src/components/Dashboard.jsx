import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from './Card';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@chakra-ui/react';

const state = {
  labels: ['Maks', 'Umie', 'Grać', 'W', 'Reacta', 'Umie'],
  datasets: [
    {
      label: 'Rainfall',
      fill: false,
      hitRadius: 100,
      hoverRadius: 10,
      hoverBorderWidth: 2,
      pointStyle: 'circle',
      lineTension: 0.5,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(125,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 2,
      options: {
        maintainAspectRatio: false,
      },
      data: [68, 45, 25, 58, 44, 52],
    },
  ],
};
export function Dashboard() {
  const [isLargerThan960] = useMediaQuery('(min-width: 960px)');
  return (
    <Flex flexDir={'column'} alignItems="center">
      <Box w={'100%'} h="auto">
        <Card
          Title={'Wykres Stanu Konta'}
          Content={<MoneyChart />}
          Color={useColorModeValue('blue.300', 'blue.300')}
          w={'90%'}
          maxW={'100%'}
        />
      </Box>
      <Box w="90%">
        <Box w="50%">
          <SimpleGrid
            width="50%"
            columns={[1, null, 2]}
            spacing="20px"
            w={'80%'}
          >
            <Card
              w="400px"
              h={'100px'}
              Color={'blue.400'}
              Title={'1290,00 PLN'}
              Content={
                <Text textAlign={'left'} color="gray.300">
                  Stan konta
                </Text>
              }
            ></Card>
            <Card
              w="400px"
              h={'100px'}
              Color={'green.400'}
              Title={'+321,00 PLN'}
              Content={
                <Text textAlign={'left'} color="gray.300">
                  Przychody
                </Text>
              }
            ></Card>
            <Card
              w="400px"
              h={'100px'}
              Color={'red.400'}
              Title={'-200,00 PLN'}
              Content={
                <Text textAlign={'left'} color="gray.300">
                  Wydatki
                </Text>
              }
            ></Card>
            <Card
              w="400px"
              h={'100px'}
              Color={'yellow.400'}
              Title={'+321,00'}
              Content={
                <Text textAlign={'left'} color="gray.300">
                  Przepływ
                </Text>
              }
            ></Card>
          </SimpleGrid>
        </Box>
      </Box>
    </Flex>
  );
}

function MoneyChart() {
  const DetermineSize = () => {
    if (window.innerWidth < 1000) return 300;
    else return 40;
  };
  const [height, setHeight] = useState(DetermineSize());

  return (
    <Line
      r
      data={state}
      height={height}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
            text: 'Average Rainfall per month',
            fontSize: 20,
          },
        },
      }}
    />
  );
}
