import { AxModule } from 'axolotis-module-definition';
import { ContainerModule } from 'inversify';

interface SerialisationDataType {
    serializeID: string;
}
interface SerializableType {
    serializeID: string;
}
type GenericSerializable = Serializable | string;
type GenericSerialisationData = SerialisationData | string;
type Serializable = {
    [id: string]: any;
} & SerializableType;
type SerialisationData = {
    [id: string]: any;
} & SerialisationDataType;
interface Serializer<T extends SerializableType> {
    getSerializeID(): string;
    deserialize(data: SerialisationData, reviver?: (obj: GenericSerialisationData) => GenericSerializable): T;
    serialize(data: T, replacer?: (obj: GenericSerializable) => GenericSerialisationData): SerialisationData;
}

declare class DefaultSerializer implements Serializer<any> {
    specialListException: (ArrayBufferConstructor | Int8ArrayConstructor | Uint8ArrayConstructor | Uint8ClampedArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor | BigInt64ArrayConstructor | BigUint64ArrayConstructor)[];
    deserialize(data: any, reviver?: (obj: GenericSerialisationData) => GenericSerializable): any;
    serialize(data: any, replacer?: (obj: GenericSerializable) => GenericSerialisationData): any;
    getSerializeID(): string;
}

declare class SerializerEngine {
    seriList: {
        [id: string]: Serializer<any>;
    };
    defaultSeri: DefaultSerializer;
    registerDataType(objSerializer: Serializer<any>): void;
    reviver: <T extends SerializableType>(subobj: GenericSerialisationData) => T;
    replacer: (subobj: GenericSerializable) => GenericSerialisationData;
    serializeToString(obj: GenericSerializable): string;
    deserializeFromString<T extends SerializableType>(obj: string): T;
    serialise(obj: GenericSerializable): GenericSerialisationData;
    deserialize<T extends SerializableType>(data: GenericSerialisationData): T;
}

declare const SerializerEngineName: unique symbol;

declare class AxSerializerModule implements AxModule {
    getModule(): ContainerModule;
}

export { AxSerializerModule, GenericSerialisationData, GenericSerializable, SerialisationData, SerialisationDataType, Serializable, SerializableType, Serializer, SerializerEngine, SerializerEngineName };
