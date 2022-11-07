import { useState } from 'react';
import { Heading, useToast, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';

import { api } from '../services/api';

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    if (!code.trim()) {
      return toast.show({
        title: 'Informe o código do bolão',
        placement: 'top',
        bgColor: 'red.500',
        duration: 1000,
      });
    }

    try {
      setIsLoading(true);

      await api.post('/pools/join', {
        code: code.toUpperCase(),
      });

      toast.show({
        title: 'Você entrou no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
        duration: 1000,
      });

      navigate('pools');

      setCode('');
    } catch (error) {
      setIsLoading(false);

      if (error.response?.data?.message === 'Pool not found') {
        return toast.show({
          title: 'Bolão não encontrado',
          placement: 'top',
          bgColor: 'red.500',
          duration: 1000,
        });
      } else if (
        error.response?.data?.message === 'You already join this pool'
      ) {
        return toast.show({
          title: 'Você já está nesse bolão',
          placement: 'top',
          bgColor: 'red.500',
          duration: 1000,
        });
      } else {
        return toast.show({
          title: 'Não foi possível se juntar ao bolão',
          placement: 'top',
          bgColor: 'red.500',
          duration: 1000,
        });
      }
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />
      {isLoading ? (
        <Loading />
      ) : (
        <VStack mt={8} mx={5} alignItems="center">
          <Heading
            fontFamily="heading"
            color="white"
            fontSize="xl"
            mb={8}
            textAlign="center"
          >
            Encontre um bolão através de{'\n'} seu código único
          </Heading>

          <Input
            mb={2}
            placeholder="Qual o código do bolão?"
            autoCapitalize="characters"
            maxLength={6}
            value={code}
            onChangeText={setCode}
          />
          <Button mt={2} title="BUSCAR BOLÃO" onPress={handleJoinPool} />
        </VStack>
      )}
    </VStack>
  );
}
