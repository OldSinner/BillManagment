import { Center, Flex, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IsLogged } from '../Utils/Auth';
import { Sidebar } from './Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  var navigate = useNavigate();
  useEffect(() => {
    console.log('ok');
    if (!IsLogged()) navigate('/login');
  }, []);
  return (
    <div>
      <Flex width={'100%'} height="100%" flexDirection={'row'} m={0} p={0}>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Box
          w={isOpen ? 'calc(100% - 200px);' : 'calc(100% - 60px);'}
          h={'100vh'}
          maxH={'100vh'}
          overflowY="auto"
        >
          {children}
        </Box>
      </Flex>
    </div>
  );
}
