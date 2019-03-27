export const getColor = colorCode => {
    switch (colorCode) {
        case 1: return "black";
        case 2: return "white";
        case 3: return "grey";
        case 4: return "brown";
        case 5: return "red";
        default: return "none";
    }
};

export const getMaterial = materialCode => {
    switch (materialCode) {
        case 1: return "steel";
        case 2: return "silver";
        case 3: return "gold";
        default: return "none";
    }
};

export const getType = typeCode => {
    switch (typeCode) {
        case 1: return "bracelet";
        case 2: return "ring";
        case 3: return "earring";
        case 4: return "necklace";
        default: return "none";
    }
};

export const confirmToString = confirmBool => {
    if (confirmBool) {
        return "yes";
    }
    return "no";
};

export const paymentStatusToString = paymentBool => {
    if (paymentBool) {
        return "paid";
    }
    return "not paid";
};

export const paymentTypeToString = paymentType => {
    switch(paymentType) {
        case 1: return "Credit card";
        case 2: return "PayPal";
        case 3: return "Swish";
        default: return "none";
    }
};

export const statusToString = status => {
    if (status === null) {
        return "none";
    }
    return status;
};

export const statusStringToCode = statusString => {
    switch(statusString) {
        case "COMPLETED": return 1;
        case "CANCELLED": return 2;
        case "SHIPPED": return 3;
        default: return 4;  // IN_PROGRESS
    }
};

export const customProductStatusToString = customProductStatus => {
    switch(customProductStatus) {
        case 1: return "PENDING";
        case 2: return "CONFIRMED";
        case 3: return "REJECTED";
        case 4: return "PAID";
        case 5: return "DECLINED";
        case 6: return "SHIPPED";
        default: return "none";
    }
};