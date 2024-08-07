import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { News, Header } from '../../components'; // Importando o novo componente News

export default function Index() {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getNewsData = async () => {
            setLoading(true);
            try {
                const resp = await axios.get("https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=e09003ae6ecc4b4a8c940567b8222b79");
                setNewsData(resp.data.articles);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        getNewsData();
    }, []);

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