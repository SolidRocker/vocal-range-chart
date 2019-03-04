import { GET_NAMES, GET_GENDERS, GET_HIGHEST_NOTES, GET_LOWEST_NOTES } from '../../redux/types';
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

export const getGenders = (maleColor, femaleColor) => dispatch => {

    let nameList = [];
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



