import { useRoute } from '@react-navigation/native';
import { HStack, VStack, Box } from 'native-base';
import { useEffect, useState } from 'react';
import { Share } from 'react-native';

import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { Option } from '../components/Option';
import { Guesses } from '../components/Guesses';
import { PoolCardProps } from '../components/PoolCard';
import { PoolHeader } from '../components/PoolHeader';

import { api } from '../services/api';

interface RouteParams {
  id: string;
}

export function Details() {
  const [pool, setPool] = useState<PoolCardProps>({} as PoolCardProps);
  const [isLoading, setIsLoading] = useState(false);
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>(
    'guesses',
  );

  const route = useRoute();
  const { id } = route.params as RouteParams;

  async function fetchPoolDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${id}`);

      setPool(response.data.pool);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: pool.code,
    });
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={pool.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />
      {pool._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={pool} />
          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              isSelected={optionSelected === 'guesses'}
              onPress={() => setOptionSelected('guesses')}
            />
            <Option
              title="Ranking do grupo"
              isSelected={optionSelected === 'ranking'}
              onPress={() => setOptionSelected('ranking')}
            />
          </HStack>
          {optionSelected === 'guesses' ? (
            <Guesses poolId={pool.id} code={pool.code} />
          ) : (
            <Box></Box>
          )}
        </VStack>
      ) : (
        <EmptyMyPoolList code={pool.code} />
      )}
    </VStack>
  );
}
