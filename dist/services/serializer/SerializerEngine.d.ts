import { DefaultSerializer } from "./DefaultSerializer";
import { GenericSerialisationData, GenericSerializable, SerializableType, Serializer } from "./Serializer";
export declare class SerializerEngine {
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
    getType(): string;
}
//# sourceMappingURL=SerializerEngine.d.ts.map