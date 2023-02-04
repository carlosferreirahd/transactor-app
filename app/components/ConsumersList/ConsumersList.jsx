import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ConsumersListRow } from './ConsumersListRow';
import { Searchbar } from 'react-native-paper';
import { isNilOrEmpty } from '../../utils/verifications';

export function ConsumersList({
  consumers,
  navigation,
}) {

  const [searchText, setSearchText] = useState('');

  const filteredConsumers = useMemo(() => {
    if (isNilOrEmpty(searchText)) return consumers;
    return consumers.filter(c => c.name.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText, consumers]);

  return (
    <>
      <Searchbar
        placeholder="Busque pelo nome do cliente"
        onChangeText={(value) => setSearchText(value)}
        value={searchText}
        placeholderTextColor="rgba(0, 0, 0, 0.45)"
        style={styles.searchInput}
      />
      <ScrollView>
        {filteredConsumers.map((consumer) => (
          <ConsumersListRow
            key={consumer.id}
            consumer={consumer}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    margin: 16,
  },
});
