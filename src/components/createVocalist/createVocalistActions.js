import { ADD_VOCALIST } from '../../redux/types';
import db from '../../utils/db'

export const addVocalist = (newVocalist) => dispatch => {

    console.log("NV: " + newVocalist.name + ", " + newVocalist.isMale + ", " + newVocalist.highestNote + ", " + newVocalist.lowestNote);
    db.collection("vocalists").doc(newVocalist.name).set({
        name: newVocalist.name,
        isMale: newVocalist.isMale,
        highestNote: newVocalist.highestNote,
        lowestNote: newVocalist.lowestNote
    })
}