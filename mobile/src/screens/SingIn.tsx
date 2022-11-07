import { Center, Icon, Text } from 'native-base';
import { Fontisto } from '@expo/vector-icons';

import { Button } from '../components/Button';
import Logo from '../assets/logo.svg';

import { useAuth } from '../hooks/useAuth';

export function SingIn() {
  const { signIn, isUserLoading } = useAuth();

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />
      <Button
        mt={12}
        title="ENTRAR COM O GOOGLE"
        type="SECONDARY"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{ _spinner: { color: 'white' } }}
      />
      <Text mt={4} color="gray.200" textAlign="center" fontSize={'14'}>
        Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação
        de sua conta.
      </Text>
    </Center>
  );
}
