import { useState } from 'react';
import { HStack, Text, useTheme, VStack, Button, useToast } from 'native-base';
import { SignOut } from 'phosphor-react-native';
import * as SecureStore from 'expo-secure-store';

import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { Loading } from '../components/Loading';

export function Config() {
  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();
  const toast = useToast();

  const { navigate } = useNavigation();

  async function clearAllValueInSecureStore() {
    try {
      setIsLoading(true);

      await SecureStore.deleteItemAsync('app-token');

      navigate('singin');
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possível limpar os dados do usuário',
        placement: 'top',
        bgColor: 'red.500',
        duration: 1000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Configurações" showBackButton />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack borderBottomWidth={1} borderBottomColor="gray.600">
          <Button
            onPress={clearAllValueInSecureStore}
            m={5}
            rounded="md"
            bgColor="gray.600"
            alignItems="flex-start"
            justifyContent="flex-start"
            _pressed={{
              bgColor: 'gray.700',
            }}
          >
            <HStack p={2}>
              <SignOut color={colors.red[500]} />
              <Text
                color="white"
                alignItems="center"
                justifyContent="center"
                ml={5}
                fontSize="md"
                fontFamily="heading"
              >
                Sair do app
              </Text>
            </HStack>
          </Button>
        </VStack>
      )}
    </VStack>
  );
}
