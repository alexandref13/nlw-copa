import { HStack } from 'native-base';
import CountryFlag from 'react-native-country-flag';

import { Input } from './Input';

interface Props {
  code: string;
  position: 'left' | 'right';
  value: string | undefined;
  onChangeText: (value: string) => void;
}

export function Team({ code, position, value, onChangeText }: Props) {
  return (
    <HStack alignItems="center">
      {position === 'left' && (
        <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />
      )}

      <Input
        w={10}
        h={9}
        textAlign="center"
        fontSize="xs"
        keyboardType="numeric"
        maxLength={1}
        value={value}
        onChangeText={onChangeText}
      />

      {position === 'right' && (
        <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />
      )}
    </HStack>
  );
}
