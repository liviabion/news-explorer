import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

type TopNewsProps = {
    title: string,
    urlImage: string,
    link: string
};

export function TopNews({ title, urlImage, link }: TopNewsProps) {
    return (
        <TouchableOpacity onPress={() => {
            Linking.openURL(link);
        }}>
            <View style={styles.container}>
                <Image source={{ uri: urlImage }} style={styles.image} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',

    },
    titleContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
    },
    title: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});
