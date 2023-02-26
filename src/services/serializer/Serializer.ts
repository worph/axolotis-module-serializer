export interface SerialisationDataType {
    serializeID: string;
}

export interface SerializableType {
    serializeID: string;
}

export type GenericSerializable = Serializable | string;
export type GenericSerialisationData = SerialisationData  | string;
export type Serializable = { [id:string]:any } & SerializableType;
export type SerialisationData = { [id:string]:any } & SerialisationDataType;

export interface Serializer<T extends SerializableType> {
    getSerializeID(): string;

    /**
     * convert SerialisationData in object T
     * key correspond to serializeID
     * @param data thr true type of GenericSerialisationData is either Serializable or String. we set any here to facilitate deserialize implementation
     * @param reviver
     */
    deserialize(data: SerialisationData, reviver?: (obj: GenericSerialisationData) => GenericSerializable): T;

    //Convert the object T in SerialisationData
    serialize(data: T, replacer?: (obj: GenericSerializable) => GenericSerialisationData): SerialisationData;
}