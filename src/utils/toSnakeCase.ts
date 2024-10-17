function toSnakeCase(str: string) {
    return str.replace(
        /([A-Z])/g,
        (_, letter: string) => `_${letter.toLowerCase()}`
    );
}

type SnakeCasedProperties<T> = {
  [K in keyof T as K extends string ? `${K & string}` : never]: T[K];
};

export default function keysToSnakeCase<T extends Record<string, any>>(
    obj: T
): SnakeCasedProperties<T> {
    const newObj: Record<string, unknown> = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = toSnakeCase(key);
            newObj[newKey] = obj[key];
        }
    }
    return newObj as SnakeCasedProperties<T>;
}
