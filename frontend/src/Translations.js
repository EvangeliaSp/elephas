

export const getColor = colorCode => {
    switch (colorCode) {
        case 1: return "black";
        case 2: return "white";
        case 3: return "grey";
        case 4: return "brown";
        case 5: return "red";
        default: return "none";
    }
}

export const getMaterial = materialCode => {
    switch (materialCode) {
        case 1: return "steel";
        case 2: return "silver";
        case 3: return "gold";
        default: return "none";
    }
}

export const getType = typeCode => {
    switch (typeCode) {
        case 1: return "bracelet";
        case 2: return "ring";
        case 3: return "earring";
        case 4: return "neacklace";
        default: return "none";
    }
}

export const confirmToString = confirmBool => {
    if (confirmBool) {
        return "yes";
    }
    return "no";
}