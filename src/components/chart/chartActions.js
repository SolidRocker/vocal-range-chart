import {
    ADD_TO_CHART,
    POST_CHANGE,
    REMOVE_FROM_CHART,
    POST_REMOVE_CHANGE,
 } from '../../redux/types';
import db from '../../utils/db'

export const addToChart = (newName) => dispatch => {

    let maleColor = 'rgb(0, 0, 255)';
    let femaleColor = 'rgb(255, 0, 0)';

    db.collection("vocalists").doc(newName).get().then( function(doc) {
        if(doc.exists) {
            let newColor = doc.data().isMale ? maleColor : femaleColor;
            let newHighestNote = doc.data().highestNote-40;
            let newLowestNote = doc.data().lowestNote-40;
            let newRange = newHighestNote - newLowestNote;

            let newVocalist = {
                name: newName,
                gender: newColor,
                highestNote: newHighestNote,
                lowestNote: newLowestNote,
                range: newRange
            }

            dispatch({
                type: ADD_TO_CHART,
                payload: newVocalist,
                payload_trigger: true
            });
        }
    });
}

// Needed to add a new field in DB, this is the patch
export const addRange = () => dispatch => {
    db.collection("vocalists").get().then(function(snapshot) {
        snapshot.forEach((doc) => {
            const docRef = db.collection("vocalists").doc(doc.id);
            docRef.update({
                range: doc.data().highestNote - doc.data().lowestNote
            });
        });
    })
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

export const removeVocalist = (id) => dispatch => {

    dispatch({
        type: REMOVE_FROM_CHART,
        payload_id: id,
        payload_trigger: true
    });
}

export const resetRemoveTrigger = () => dispatch => {
    dispatch({
        type: POST_REMOVE_CHANGE,
        payload_trigger: false
    });
}





