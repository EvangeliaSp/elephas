

export const getColor = colorCode => {
    switch (colorCode) {
        case 1: return "black";
        case 2: return "white";
        case 3: return "grey";
        case 4: return "brown";
        case 5: return "red";
        case 6: return "green";
        case 7: return "yellow";
        case 8: return"blue";
        default: return "none";
    }
}

export const getMaterial = materialCode => {
    switch (materialCode) {
        case 1: return "steel";
        case 2: return "silver";
        case 3: return "gold";
        case 4: return "wool";
        case 5: return "stones"
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