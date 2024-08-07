import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

type NewsProps = {
    title: string,
    description: string,
    link: string,
    source: string,
    urlImage: string
};

export function News({ title, description, link, source, urlImage }: NewsProps) {
    return (
        <TouchableOpacity onPress={() => Linking.openURL(link)}>
            <View style={styles.container}>
                <Image source={{ uri: urlImage }} style={styles.image} />
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.source}>{source}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    image: {
        width: '100%',
        height: 150,
    },
    content: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    source: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
    },
});
