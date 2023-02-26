export interface SerialisationDataType {
    serializeID: string;
}
export interface SerializableType {
    serializeID: string;
}
export type GenericSerializable = Serializable | string;
export type GenericSerialisationData = SerialisationData | string;
export type Serializable = {
    [id: string]: any;
} & SerializableType;
export type SerialisationData = {
    [id: string]: any;
} & SerialisationDataType;
export interface Serializer<T extends SerializableType> {
    getSerializeID(): string;
    deserialize(data: SerialisationData, reviver?: (obj: GenericSerialisationData) => GenericSerializable): T;
    serialize(data: T, replacer?: (obj: GenericSerializable) => GenericSerialisationData): SerialisationData;
}
//# sourceMappingURL=Serializer.d.ts.map