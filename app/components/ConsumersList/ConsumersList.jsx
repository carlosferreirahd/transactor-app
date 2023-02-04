import React from 'react';
import { ScrollView } from 'react-native';
import { ConsumersListRow } from './ConsumersListRow';

export function ConsumersList({
  consumers,
  navigation,
}) {
  return (
    <ScrollView>
      {consumers.map((consumer) => (
        <ConsumersListRow
          key={consumer.id}
          consumer={consumer}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
}
