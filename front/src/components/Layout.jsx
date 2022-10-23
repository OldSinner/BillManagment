import { Center, Flex, Box } from '@chakra-ui/react';
import { useState } from 'react';
import { Sidebar } from './Sidebar/Sidebar';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <Flex width={'100%'} height="100%" flexDirection={'row'} m={0} p={0}>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Box
          align={'center'}
          justify={'center'}
          w={isOpen ? 'calc(100% - 200px);' : 'calc(100% - 60px);'}
        >
          {children}
        </Box>
      </Flex>
    </div>
  );
}
