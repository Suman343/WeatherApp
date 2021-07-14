import React from 'react';
import { View,Platform,StyleSheet,StatusBar } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { colors } from '../utils';

export default function ReloadIcon({load}) {
    const reloadIconName= Platform.OS === 'ios'?'ios-refresh':'md-refresh';
    return (
        <View style={styles.reload}>
            <Ionicons onPress={load}  name={reloadIconName} size={25} color={colors.PRIMARY_COLOR} />
        </View>
    )
}

const styles = StyleSheet.create({
    reload:{
        position:'absolute',
        ...Platform.select({
            ios:{
                top:-20,
            },
            android:{
                top:2*StatusBar.currentHeight,
            },
        }),
        right:20,
    },
})