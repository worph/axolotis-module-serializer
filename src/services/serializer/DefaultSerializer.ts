import {
    GenericSerialisationData,
    GenericSerializable,
    Serializer
} from "./Serializer";

/**
 * The aims of this serializer is to be able to serialize any primitive type and any object
 */
export class DefaultSerializer implements Serializer<any> {
    specialListException = [
        ArrayBuffer,
        Int8Array,
        Uint8Array,
        Uint8ClampedArray,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
        BigInt64Array,
        BigUint64Array
    ]

    deserialize(data: any, reviver?: (obj: GenericSerialisationData) => GenericSerializable): any {
        ///////////////////////////
        //Basic Expression check
        ///////////////////////////
        if (data === undefined) {
            return undefined;
        }
        if (data === null) {
            return null;
        }
        if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
            return data;
        }
        //the following object can be parsed natively no need to interfere

        for (const specialListExceptionElement of this.specialListException) {
            if (data instanceof Object && data instanceof specialListExceptionElement) {
                return data;
            }
        }
        if (data["serializeID"]) {
            throw new Error();
        }

        //Deserialize
        if (data.type === 'Map') {
            let dataRet = new Map();
            for (const [key, value] of (data.value as [any,any][])) {
                dataRet.set(reviver(key), reviver(value));
            }
            return dataRet;
        } else if (data instanceof Array) {
            let dataRet = [];
            for (let i = 0; i < data.length; i++) {
                dataRet[i] = reviver(data[i]);
            }
            return dataRet;
        } else if (data instanceof Object) {
            let ret = {};
            for (const dataKey in data) {
                ret[dataKey] = reviver(data[dataKey]);
            }
            return ret;
        } else {
            return data;
        }

    }

    serialize(data: any, replacer?: (obj: GenericSerializable) => GenericSerialisationData): any {
        ///////////////////////////
        //Basic Expression check
        ///////////////////////////
        if (data === undefined) {
            return undefined;
        }
        if (data === null) {
            return null;
        }
        if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
            return data;
        }
        //the following object can be parsed natively no need to interfere
        for (const specialListExceptionElement of this.specialListException) {
            if (data instanceof Object && data instanceof specialListExceptionElement) {
                return data;
            }
        }
        if (data["serializeID"]) {
            throw new Error();
        }

        ///////////
        //serialize
        ///////////
        if (data instanceof Array) {
            for (let i = 0; i < data.length; i++) {
                data[i] = replacer(data[i]);
            }
            return data;
        } else if (data instanceof Map) {
            let dataRet = new Map();
            for (const [key, value] of (data as Map<any, any>)) {
                dataRet.set(replacer(key), replacer(value));
            }
            return {
                type: 'Map',
                value: Array.from(dataRet.entries()),
            };
        } else if (data instanceof Object) {
            let ret = {};
            for (const dataKey in data) {
                ret[dataKey] = replacer(data[dataKey]);
            }
            return ret;
        } else {
            return JSON.parse(JSON.stringify(data));//keeps only data
        }
    }


    getSerializeID(): string {
        return null;//default special case
    }
}
