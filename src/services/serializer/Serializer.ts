
export interface Serializable {
    getSerialisationID(): string;
}

export type SerializableType = { [id:string]:any } | Serializable;
export type GenericSerializable = SerializableType | string;
export type SerialisationData = { [id:string]:any };
export type GenericSerialisationData = SerialisationData  | string;

export interface Serializer<T extends Serializable> {
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
