import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet, FlatList, Text, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { News, SearchBar, Header } from '../../components';

// Definindo a interface para um artigo de notícia
interface NewsItem {
    title: string;
    description: string;
    url: string;
    source: {
        name: string;
    };
    urlToImage: string;
}

export default function Search() {
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [history, setHistory] = useState<string[]>([]);

    const getNewsData = async (query: string) => {
        setLoading(true);
        try {
            const resp = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=adaad823e14d4eb7a5177752d076a5e3`);
            const filteredArticles = resp.data.articles.filter((article: NewsItem) => article.title !== "[Removed]");
            setNewsData(filteredArticles);
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

    const handleClearSearch = () => {
        setSearchQuery('');
        setNewsData([]);
    };

    const handleClearHistory = () => {
        setHistory([]);
    };

    // Tipando o parâmetro 'item' como NewsItem
    const renderItem = ({ item }: { item: NewsItem }) => (
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
            <Header title="Search" />
            <SearchBar onSearch={handleSearch} />
            <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>Search History:</Text>
                {history.length > 0 && (
                    <Button title="Clear History" onPress={handleClearHistory} color="#FF0000" />
                )}
                {history.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleSearch(item)}>
                        <Text style={styles.historyItem}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : newsData.length === 0 && searchQuery !== '' ? (
                <Text style={styles.noResultsText}>No results found for "{searchQuery}".</Text>
            ) : (
                <FlatList
                    data={newsData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.url}
                />
            )}
            {newsData.length > 0 && (
                <Button title="Clear Search" onPress={handleClearSearch} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    historyContainer: {
        padding: 5,
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
    noResultsText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});
