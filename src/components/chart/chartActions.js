import {
    GET_NAMES,
    GET_GENDERS,
    GET_HIGHEST_NOTES,
    GET_LOWEST_NOTES,
    ADD_TO_CHART,
    POST_CHANGE
 } from '../../redux/types';
import db from '../../utils/db'

export const getNames = () => dispatch => {

    let nameList = [];
    db.collection("vocalists").get().then(function(snapshot) {
        snapshot.forEach(function(vocalist) {
            //console.log("NAME: " + vocalist.data().name)
            nameList.push(vocalist.data().name);
        });

    }).then(
    dispatch({
        type: GET_NAMES,
        payload: nameList
    }))
}

export const getGenders = () => dispatch => {

    let nameList = [];
    let maleColor = 'rgb(0, 0, 255)';
    let femaleColor = 'rgb(255, 0, 0)';

    db.collection("vocalists").get().then(function(snapshot) {
        snapshot.forEach(function(vocalist) {
            //console.log("GENDER: " + vocalist.data().isMale)
            if(vocalist.data().isMale) {
                nameList.push(maleColor)
            }
            else {
                nameList.push(femaleColor)
            }
        });

    }).then(
    dispatch({
        type: GET_GENDERS,
        payload: nameList
    }))
}

export const getHighestNotes = () => dispatch => {

    let nameList = [];
    db.collection("vocalists").get().then(function(snapshot) {
        snapshot.forEach(function(vocalist) {
            //console.log("HIGH: " + vocalist.data().highestNote)
            nameList.push(vocalist.data().highestNote-40);
        });

    }).then(
    dispatch({
        type: GET_HIGHEST_NOTES,
        payload: nameList
    }))
}

export const getLowestNotes = () => dispatch => {

    let nameList = [];
    db.collection("vocalists").get().then(function(snapshot) {
        snapshot.forEach(function(vocalist) {
            //console.log("LOW: " + vocalist.data().lowestNote)
            nameList.push(vocalist.data().lowestNote-40);
        });

    }).then(
    dispatch({
        type: GET_LOWEST_NOTES,
        payload: nameList
    }))
}

export const addToChart = (newName) => dispatch => {

    let maleColor = 'rgb(0, 0, 255)';
    let femaleColor = 'rgb(255, 0, 0)';

    db.collection("vocalists").doc(newName).get().then( function(doc) {
        if(doc.exists) {
            console.log("E: " + newName);
            let newColor = doc.data().isMale ? maleColor : femaleColor;
            let newHighestNote = doc.data().highestNote-40;
            let newLowestNote = doc.data().lowestNote-40;

            dispatch({
                type: ADD_TO_CHART,
                payload_name: newName,
                payload_gender: newColor,
                payload_highestNote: newHighestNote,
                payload_lowestNote: newLowestNote,
                payload_trigger: true
            });
        }
    });
}

export const postChange = () => dispatch => {
    dispatch({
        type: POST_CHANGE,
        payload_trigger: true
    });
}

export const resetTrigger = () => dispatch => {
    dispatch({
        type: POST_CHANGE,
        payload_trigger: false
    });
}




