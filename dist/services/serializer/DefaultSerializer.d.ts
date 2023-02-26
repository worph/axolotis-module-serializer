import { GenericSerialisationData, GenericSerializable, Serializer } from "./Serializer";
export declare class DefaultSerializer implements Serializer<any> {
    specialListException: (ArrayBufferConstructor | Int8ArrayConstructor | Uint8ArrayConstructor | Uint8ClampedArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor | BigInt64ArrayConstructor | BigUint64ArrayConstructor)[];
    deserialize(data: any, reviver?: (obj: GenericSerialisationData) => GenericSerializable): any;
    serialize(data: any, replacer?: (obj: GenericSerializable) => GenericSerialisationData): any;
    getSerializeID(): string;
}
//# sourceMappingURL=DefaultSerializer.d.ts.map