import { UserReturnedData } from "@/types";

function toCamelCase(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
  }
  
export default function keysToCamelCase(obj: Record<string, unknown>): UserReturnedData | object {
    const newObj: Record<string, unknown> = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = toCamelCase(key);
            newObj[newKey] = obj[key];
        }
    }
    return newObj;
}

