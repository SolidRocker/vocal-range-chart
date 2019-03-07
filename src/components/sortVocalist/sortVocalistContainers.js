export const compareName = (a, b) => {
    if(a.name < b.name) {
        return -1;
    }
    if(a.name > b.name) {
        return 1;
    }
    return 0;
}

export const compareWidestRange = (a, b) => {
    if(a.range > b.range) {
        return -1;
    }
    if(a.range < b.range) {
        return 1;
    }
    return 0;
}

export const compareHighestNote = (a, b) => {
    if(a.highestNote > b.highestNote) {
        return -1;
    }
    if(a.highestNote < b.highestNote) {
        return 1;
    }
    return 0;
}

export const compareLowestNote = (a, b) => {
    if(a.lowestNote < b.lowestNote) {
        return -1;
    }
    if(a.lowestNote > b.lowestNote) {
        return 1;
    }
    return 0;
}