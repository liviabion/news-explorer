import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { News, SearchBar } from '../../components';

export default function Search() {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [history, setHistory] = useState<string[]>([]);

    const getNewsData = async (query: string) => {
        setLoading(true);
        try {
            const resp = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=e09003ae6ecc4b4a8c940567b8222b79`);
            setNewsData(resp.data.articles);
            if (query && !history.includes(query)) {
                setHistory([query, ...history]);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        getNewsData(query);
    };

    const renderItem = ({ item }) => (
        <News
            title={item.title}
            description={item.description}
            link={item.url}
            source={item.source.name}
            urlImage={item.urlToImage}
        />
    );

    return (
        <View style={styles.container}>
            <SearchBar onSearch={handleSearch} />
            <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Search History:</Text>
                {history.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleSearch(item)}>
                        <Text style={styles.historyItem}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={newsData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.url}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 80,
    },
    historyContainer: {
        marginBottom: 20,
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    historyItem: {
        fontSize: 16,
        color: '#007BFF',
        marginBottom: 5,
    },
});
