import { POPULATE_NAMES } from '../../redux/types';
import db from '../../utils/db'

export const populateNames = () => dispatch => {

    let nameList = [];
    db.collection("vocalists").get().then(function(snapshot) {
        snapshot.forEach(function(vocalist) {
            nameList.push(vocalist.data().name);
        });
    }).then(
    dispatch({
        type: POPULATE_NAMES,
        payload: nameList
    }))
}
