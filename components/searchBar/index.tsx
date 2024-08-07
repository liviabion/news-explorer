import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

type SearchBarProps = {
    onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for news..."
                value={query}
                onChangeText={setQuery}
            />
            <Button title="Search" onPress={handleSearch} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
});
