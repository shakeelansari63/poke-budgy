const serializeDateinAny = (obj: any): any => {
    // Serialize Date
    if (obj instanceof Date) {
        return obj.toISOString();
    }

    // Serialize Dates in Array
    else if (Array.isArray(obj)) {
        return obj.map((arrObj) => serializeDateinAny(arrObj));
    }

    // Serialize Json Object
    else if (typeof obj === "object") {
        const newObj: any = {};
        Object.entries(obj).forEach(([key, val]) => {
            newObj[key] = serializeDateinAny(val);
        });
        return newObj;
    }

    return obj;
};

export const dateFormatMiddleware = (store: any) => (next: any) => (action: any) => {
    const payload = action.payload;

    action.payload = serializeDateinAny(payload);
    console.log(action.payload);

    next(action);
};
