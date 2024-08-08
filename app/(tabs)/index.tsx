import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { News, Header } from '../../components'; // Importando o novo componente News

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

export default function Index() {
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getNewsData = async () => {
            setLoading(true);
            try {
                const resp = await axios.get("https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=adaad823e14d4eb7a5177752d076a5e3");
                setNewsData(resp.data.articles);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        getNewsData();
    }, []);

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
            <Header title="Home" />
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
  },
});
