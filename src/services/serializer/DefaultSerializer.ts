import {
    GenericSerialisationData,
    GenericSerializable,
    Serializer
} from "./Serializer";

/**
 * The aims of this serializer is to be able to serialize any primitive type and any object
 */
export class DefaultSerializer implements Serializer<any> {

    strictMode: boolean = false;

    /**
     * In strict mode Object (Records) are not allowed
     * @param strictMode
     */
    setStrictMode(strictMode: boolean): void {
        this.strictMode = strictMode;
    }

    arrayTypes = {
        "ArrayBuffer": ArrayBuffer,
        "Int8Array": Int8Array,
        "Uint8Array": Uint8Array,
        "Uint8ClampedArray": Uint8ClampedArray,
        "Int16Array": Int16Array,
        "Uint16Array": Uint16Array,
        "Int32Array": Int32Array,
        "Uint32Array": Uint32Array,
        "Float32Array": Float32Array,
        "Float64Array": Float64Array,
        "BigInt64Array": BigInt64Array,
        "BigUint64Array": BigUint64Array
    }

    private encodeTypedArray(typedArray: ArrayBuffer | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array): string {
        let binary = '';
        let buffer = typedArray instanceof ArrayBuffer ? typedArray : typedArray.buffer;
        let bytes = new Uint8Array(buffer);
        for (let byte of bytes) {
            binary += String.fromCharCode(byte);
        }
        let type = typedArray.constructor.name;
        if (typeof btoa !== 'undefined') {
            // In a browser, use the built-in btoa function
            return type + ":" + btoa(binary);
        } else if (typeof Buffer !== 'undefined') {
            // In Node.js, use the Buffer object
            return type + ":" + Buffer.from(binary, 'binary').toString('base64');
        } else {
            throw new Error('Cannot encode ArrayBuffer to Base64 string');
        }
    }

    private decodeTypedArray(base64String: string): any {
        let [type, base64Data] = base64String.split(":");
        if (type === "ArrayBuffer") {
            const binary = typeof atob !== 'undefined'
                ? atob(base64Data)
                : Buffer.from(base64Data, 'base64').toString('binary');

            const buffer = new ArrayBuffer(binary.length);
            const view = new Uint8Array(buffer);

            for (let i = 0; i < binary.length; i++) {
                view[i] = binary.charCodeAt(i);
            }

            return buffer;
        }

        if (!this.arrayTypes.hasOwnProperty(type)) {
            return base64String;
        }

        let binary;
        if (typeof atob !== 'undefined') {
            // In a browser, use the built-in atob function
            binary = atob(base64Data);
        } else if (typeof Buffer !== 'undefined') {
            // In Node.js, use the Buffer object
            binary = Buffer.from(base64Data, 'base64').toString('binary');
        } else {
            throw new Error('Cannot decode Base64 string to ArrayBuffer');
        }

        let bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return new this.arrayTypes[type](bytes.buffer);
    }


    deserialize(data: any, reviver?: (obj: GenericSerialisationData) => GenericSerializable): any {
        if(!reviver){
            reviver = (obj: GenericSerialisationData) => {
                return this.deserialize(obj);
            }
        }
        ///////////////////////////
        //Basic Expression check
        ///////////////////////////
        if (data === undefined) {
            return undefined;
        }
        if (data === null) {
            return null;
        }

        if (typeof data === "string") {
            return this.decodeTypedArray(data);
        } else if (typeof data === "number" || typeof data === "boolean") {
            return data;
        }

        if (data["getSerialisationID"]) {
            throw new Error("Cannot use default to deserialize a serializable object :"+data.getSerialisationID());
        }
        if ( data["serializeID"]) {
            throw new Error("Cannot use default to deserialize a serializable object :"+data["serializeID"]);
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
        if(!replacer){
            replacer = (obj: GenericSerializable) => {
                return this.serialize(obj);
            }
        }
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
        for (const specialListExceptionElement in this.arrayTypes) {
            if (data instanceof Object && data instanceof this.arrayTypes[specialListExceptionElement]) {
                return this.encodeTypedArray(data);
            }
        }
        if (data["getSerialisationID"]) {
            throw new Error("Cannot use default to deserialize a serializable object :"+data.getSerialisationID());
        }
        if ( data["serializeID"]) {
            throw new Error("Cannot use default to deserialize a serializable object :"+data["serializeID"]);
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
            if(this.strictMode){
                console.warn("Strict mode is enabled and Object are not allowed")
            }
            let ret = {};
            for (const dataKey in data) {
                ret[dataKey] = replacer(data[dataKey]);
            }
            return ret;
        } else {
            if(this.strictMode){
                throw new Error("Strict mode is enabled and Object are not allowed");
            }
            return JSON.parse(JSON.stringify(data));//keeps only data
        }
    }


    getSerializeID(): string {
        return null;//default special case
    }
}
