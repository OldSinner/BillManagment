import { Flex } from '@chakra-ui/react';
import { Sidebar } from './Sidebar/Sidebar';

export default function Layout({ children }) {
  return (
    <div>
      <Flex>
        <Sidebar />
        {children}
      </Flex>
    </div>
  );
}
