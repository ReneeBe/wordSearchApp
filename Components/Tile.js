import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Button, Pressable, StyleSheet} from 'react-native';
import { color } from 'react-native-reanimated';


export default function Tile(props){
    const {index, handleClick, value, indices, selected, firstAndLastIndices} = props

    // function handleSelect(e){
    //     const current = value;
    //     let radius;
    //     if (indices.includes(Number(current))) {
    //         // setColors([{text: "#230051", background: "white"}])
    //         let horizontalIndex = firstAndLastIndices['hor'].indexOf(Number(current));
    //         let verticalIndex = firstAndLastIndices['ver'].indexOf(Number(current));
    //         if (horizontalIndex !== -1) {
    //             if (horizontalIndex%2 === 0) {
    //                 // radius = 45;
    //                 // radius = "45% 0% 0% 45%";
    //                 radius = [{topLeft: 100, topRight: 0, bottomRight: 0, bottomLeft: 100}]
    //             } else {
    //                 // radius = 45;
    //                 // radius = "0% 45% 45% 0%";
    //                 radius = [{topLeft: 0, topRight: 100,  bottomRight: 100, bottomLeft: 0}]

    //             }
    //         } else if (verticalIndex !== -1) {
    //             if (verticalIndex %2 === 0) {
    //                 // radius = "45% 45% 0% 0%";
    //                 radius = [{topLeft: 100, topRight: 100, bottomRight: 0, bottomLeft: 0 }]

    //                 // radius = 45;
    //             } else {
    //                 // radius = "0% 0% 45% 45%";
    //                 // radius = 45;
    //                 radius = [{topLeft: 0, topRight: 0, bottomRight: 50, bottomLeft: 50}]

    //             }
    //         }
    //         setBorderRadius(prev => radius)
    //     }
    // }




    function computeColor(){
        if(selected === true) {
            return ["#230051", "white"];
        } 
        return ["#E3D0FF", "#50495A"];
    }

    function computeRadius(){
        let current = Number(index);
        // console.log('hi', index)
        // console.log('hi', selected)
        if (selected && indices.includes(current)) {
            // console.log('hi', indices.includes(current))

            let horizontalIndex = firstAndLastIndices['hor'].indexOf(current);
            let verticalIndex = firstAndLastIndices['ver'].indexOf(current);
            if (horizontalIndex !== -1) {
                if (horizontalIndex%2 === 0) {
                    // radius = 45;
                    // radius = "45% 0% 0% 45%";
                    return {topLeft: 45, topRight: 0, bottomRight: 0, bottomLeft: 45}
                } else {
                    // radius = 45;
                    // radius = "0% 45% 45% 0%";
                    return {topLeft: 0, topRight: 45,  bottomRight: 45, bottomLeft: 0}

                }
            } 
            if (verticalIndex !== -1) {
                if (verticalIndex %2 === 0) {
                    // radius = "45% 45% 0% 0%";
                    return {topLeft: 45, topRight: 45, bottomRight: 0, bottomLeft: 0 }

                    // radius = 45;
                } else {
                    // radius = "0% 0% 45% 45%";
                    // radius = 45;
                    return {topLeft: 0, topRight: 0, bottomRight: 45, bottomLeft: 45} 

                }
            }


        }
        return {topLeft: 0, topRight: 0, bottomRight: 0, bottomLeft: 0}

    }



    const styles = StyleSheet.create({
        tileText: {
            fontSize: 25,
            marginHorizontal: 5,
            // marginLeft: 5.2,
                // fontWeight: 'bold',
            fontFamily: 'Menlo-Bold',
            // letterSpacing: 5,
            color: computeColor()[1]
                // borderColor: computeColor()[0],
        },
        tileContainer: {
            backgroundColor: computeColor()[0],
            color: computeColor()[1],
            borderTopLeftRadius: computeRadius().topLeft,
            borderTopRightRadius: computeRadius().topRight,
            borderBottomLeftRadius: computeRadius().bottomLeft,
            borderBottomRightRadius: computeRadius().bottomRight,
            borderWidth: 4,
            margin: 1,
            borderColor: computeColor()[0],
        }
    })

    return(
        <TouchableOpacity
        onPress={() => {handleClick(index)}}
        title={value}
        style={styles.tileContainer}
        // backgroundColor={colors.background}
        // borderTopLeftRadius={borderRadius.topLeft}
        // borderTopRightRadius={borderRadius.topRight}
        // borderBottomLeftRadius={borderRadius.bottomLeft}
        // borderBottomRightRadius={borderRadius.bottomRight}
        // }
        // hitSlop= {2}
        // color={computeColor()[1]}
        // value={index}
        >
        
            <Text style={styles.tileText} >{value}</Text>

        </TouchableOpacity> 
    )
}

