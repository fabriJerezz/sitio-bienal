function toSnakeCase(str: string) {
    return str.replace(
        /([A-Z])/g,
        (_, letter: string) => `_${letter.toLowerCase()}`
    );
}

export function keysToSnakeCase(
    obj: Record<string, unknown>
): Record<string, unknown> {
    const newObj: Record<string, unknown> = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = toSnakeCase(key);
            newObj[newKey] = obj[key];
        }
    }
    return newObj;
}
