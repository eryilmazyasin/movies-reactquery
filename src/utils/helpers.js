export const isNullOrUndefined = (obj) => {
    if (typeof obj === 'undefined' || obj === undefined || obj === null) return true;
    return false;
};

export const isNullOrUndefinedOrEmpty = (obj) => {
    if (typeof obj === 'undefined' || obj === undefined || obj === null || obj === '') return true;
    return false;
};

export const notNullOrUndefined = (obj) => {
    if (typeof obj !== 'undefined' && obj !== undefined && obj !== null) return true;
    return false;
};

export const notNullOrUndefinedOrEmpty = (obj) => {
    if (typeof obj !== 'undefined' && obj !== undefined && obj !== null && obj !== '') return true;
    return false;
};