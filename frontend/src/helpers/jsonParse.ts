

export function jsonParseSafe(stringData: string,defaultValue:any, returnError = false) {
    try {
        const data = JSON.parse(stringData);
        return data;
    } catch (error) {
        if (returnError) {
            return error;
        }
        return defaultValue;
    }
}