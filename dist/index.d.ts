import { AxModule } from 'axolotis-module-definition';
import { ContainerModule } from 'inversify';

interface Serializable {
    getSerialisationID(): string;
}
type SerializableType = {
    [id: string]: any;
} | Serializable;
type GenericSerializable = SerializableType | string;
type SerialisationData = {
    [id: string]: any;
};
type GenericSerialisationData = SerialisationData | string;
interface Serializer<T extends Serializable> {
    getSerializeID(): string;
    deserialize(data: SerialisationData, reviver?: (obj: GenericSerialisationData) => GenericSerializable): T;
    serialize(data: T, replacer?: (obj: GenericSerializable) => GenericSerialisationData): SerialisationData;
}

declare class DefaultSerializer implements Serializer<any> {
    strictMode: boolean;
    setStrictMode(strictMode: boolean): void;
    arrayTypes: {
        ArrayBuffer: ArrayBufferConstructor;
        Int8Array: Int8ArrayConstructor;
        Uint8Array: Uint8ArrayConstructor;
        Uint8ClampedArray: Uint8ClampedArrayConstructor;
        Int16Array: Int16ArrayConstructor;
        Uint16Array: Uint16ArrayConstructor;
        Int32Array: Int32ArrayConstructor;
        Uint32Array: Uint32ArrayConstructor;
        Float32Array: Float32ArrayConstructor;
        Float64Array: Float64ArrayConstructor;
        BigInt64Array: BigInt64ArrayConstructor;
        BigUint64Array: BigUint64ArrayConstructor;
    };
    private encodeTypedArray;
    private decodeTypedArray;
    deserialize(data: any, reviver?: (obj: GenericSerialisationData) => GenericSerializable): any;
    serialize(data: any, replacer?: (obj: GenericSerializable) => GenericSerialisationData): any;
    getSerializeID(): string;
}

declare class SerializerEngine {
    seriList: {
        [id: string]: Serializer<any>;
    };
    defaultSeri: DefaultSerializer;
    getDefaultSerializer(): DefaultSerializer;
    registerDataType(objSerializer: Serializer<any>): void;
    reviver: <T extends SerializableType>(subobj: GenericSerialisationData) => T;
    replacer: (subobj: GenericSerializable) => GenericSerialisationData;
    serializeToString(obj: GenericSerializable): string;
    deserializeFromString<T extends SerializableType>(obj: string): T;
    serialise(obj: GenericSerializable): GenericSerialisationData;
    deserialize<T extends SerializableType>(data: GenericSerialisationData): T;
    isSerializable(obj: any): boolean;
    clone<T>(data: T): T;
}

declare const SerializerEngineName: unique symbol;

declare class AxSerializerModule implements AxModule {
    getModule(): ContainerModule;
}

export { AxSerializerModule, GenericSerialisationData, GenericSerializable, SerialisationData, Serializable, SerializableType, Serializer, SerializerEngine, SerializerEngineName };
