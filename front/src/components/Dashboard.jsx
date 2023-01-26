import {
  Box,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from './Card';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import { Apischema } from './ApiSchema';
import axios from 'axios';
import { GetUser } from '../Utils/Auth';

import {
  LineChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceArea,
  ReferenceLine,
  ReferenceDot,
  LabelList,
  Label,
  ResponsiveContainer,
  AreaChart,
} from 'recharts';

const datatest = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
];
const labels = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];
const state = {

  datasets: [
    {
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
      data: [],
    },
  ],
};
export function Dashboard() {
  var user = GetUser();
  const [summary, setSummary] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [chartdata, setChartData] = useState([]);
  const QuerySummaryData = () => {
    axios
      .get(Apischema.summary, {
        headers: { Authorization: 'bearer ' + user.Token },
      })
      .then(res => {
        var data = [];
        for (let i = 1; i < 13; i++) {
          data.push({ name: labels[i - 1], "Przepływ": res.data.data.monthly[i] ?? 0, "unit": "PLN" });
        }
        setSummary(res.data.data);
        setChartData(data);
        console.log(data)
        setIsLoaded(true)
      });
  };

  useEffect(() => {
    QuerySummaryData();
  }, []);
  return (
    <Flex flexDir={'column'} alignItems="center">
      <Box w={'100%'} h="auto">
        <Card
          Title={'Wykres Przepływu pieniędzy'}
          isLoaded={isLoaded}
          Content={isLoaded ? <MoneyChart2 data={chartdata} /> : <Spinner />}
          Color={useColorModeValue('blue.300', 'blue.300')}
          w={'90%'}
          maxW={'100%'}
        />
      </Box>
      <Box w="90%">
        <Box w={['90%', '50%']}>
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
              Title={summary?.balance.toFixed(2) + ' PLN'}
              isLoaded={isLoaded}
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
              Title={summary?.income.toFixed(2) + ' PLN'}
              isLoaded={isLoaded}
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
              Title={summary?.outcome.toFixed(2) + ' PLN'}
              isLoaded={isLoaded}
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
              Title={(summary?.income + summary?.outcome).toFixed(2) + ' PLN'}
              isLoaded={isLoaded}
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

function MoneyChart2({ data }) {
  return <ResponsiveContainer width="100%" height="80%">
    <AreaChart data={data}
      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
      <XAxis dataKey="name" />
      <YAxis />
      <Area type="monotone" dataKey="Przepływ" stroke="#48bb78" fill="#48bb78" />
      <Tooltip payload={[{ name: '05-01', value: 12, unit: 'kg' }]} />
    </AreaChart>
  </ResponsiveContainer>
}
function MoneyChart() {
  const DetermineSize = () => {
    if (window.innerWidth < 1000) return 300;
    else return 40;
  };
  const height = DetermineSize();
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
