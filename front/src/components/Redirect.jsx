import { Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Redirect() {
  var navigate = useNavigate();
  useEffect(() => {}, []);
  return <Spinner />;
}
