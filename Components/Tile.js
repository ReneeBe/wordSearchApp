import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../adjustableSize'

export default function Tile(props){
    const {index, handleClick, value, indices, selected, firstAndLastIndices} = props

    function computeColor(){
        if(selected === true) {
            return ["#230051", "white"];
        } 
        return ["#E3D0FF", "#50495A"];
    }

    function computeRadius(){
        let current = Number(index);
        if (selected && indices.includes(current)) {
            let horizontalIndex = firstAndLastIndices['hor'].indexOf(current);
            let verticalIndex = firstAndLastIndices['ver'].indexOf(current);
            if (horizontalIndex !== -1) {
                if (horizontalIndex%2 === 0) {
                    return {topLeft: 45, topRight: 0, bottomRight: 0, bottomLeft: 45}
                } else {
                    return {topLeft: 0, topRight: 45,  bottomRight: 45, bottomLeft: 0}
                }
            } 
            if (verticalIndex !== -1) {
                if (verticalIndex %2 === 0) {
                    return {topLeft: 45, topRight: 45, bottomRight: 0, bottomLeft: 0 }
                } else {
                    return {topLeft: 0, topRight: 0, bottomRight: 45, bottomLeft: 45} 
                }
            }
        }
        return {topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0}
    }

    const styles = StyleSheet.create({
        tileText: {
            fontSize: horizontalScale(25),
            marginHorizontal: horizontalScale(4),
            fontFamily: 'Menlo',
            color: computeColor()[1]
        },
        tileContainer: {
            backgroundColor: computeColor()[0],
            color: computeColor()[1],
            borderTopLeftRadius: computeRadius().topLeft,
            borderTopRightRadius: computeRadius().topRight,
            borderBottomLeftRadius: computeRadius().bottomLeft,
            borderBottomRightRadius: computeRadius().bottomRight,
            borderWidth: verticalScale(4),
            margin: verticalScale(1),
            borderColor: computeColor()[0],
        }
    })

    return(
        <TouchableOpacity
        onPress={() => {handleClick(index)}}
        title={value}
        style={styles.tileContainer}
        >
            <Text style={styles.tileText}>{value}</Text>
        </TouchableOpacity> 
    )
}

