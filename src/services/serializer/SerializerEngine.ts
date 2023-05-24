import {DefaultSerializer} from "./DefaultSerializer";
import {
    GenericSerialisationData,
    GenericSerializable, SerializableType,
    Serializer,
} from "./Serializer";

export class SerializerEngine {
    seriList: { [id: string]: Serializer<any> } = {};
    defaultSeri = new DefaultSerializer();

    getDefaultSerializer(): DefaultSerializer {
        return this.defaultSeri;
    }

    registerDataType(objSerializer: Serializer<any>) {
        this.seriList[objSerializer.getSerializeID()] = objSerializer;
    }

    reviver = <T extends SerializableType>(subobj: GenericSerialisationData): T => {
        return this.deserialize<T>(subobj);
    }

    replacer = (subobj: GenericSerializable) => {
        return this.serialise(subobj);
    }

    serializeToString(obj: GenericSerializable): string {
        return JSON.stringify(this.serialise(obj));
    }

    deserializeFromString<T extends SerializableType>(obj: string): T {
        return this.deserialize<T>(JSON.parse(obj));
    }

    serialise(obj: GenericSerializable): GenericSerialisationData {
        if (obj && ((obj as any).serializeID && this.seriList[(obj as any).serializeID])) {
            let seri:Serializer<any> = this.seriList[(obj as any).serializeID];
            if (!seri) throw new Error("Serializer not found for " + (obj as any).serializeID);
            let serializedData = seri.serialize(obj, this.replacer);
            serializedData.serializeID = (obj as any).serializeID;//ensure that the serializeID is always transmitted
            return serializedData;
        }else {
            let serializedData = this.defaultSeri.serialize(obj, this.replacer);
            return serializedData;
        }
    }

    deserialize<T extends SerializableType>(data: GenericSerialisationData): T {
        let seri:any = this.defaultSeri;
        if (data && ((data as any).serializeID && this.seriList[(data as any).serializeID])) {
            seri = this.seriList[(data as any).serializeID];
        }
        return seri.deserialize(data, this.reviver);
    }

    /**
     * Checks if the object is serializable. A serializable object has a serializeID and a serializer registered for it.
     * @param obj The object to check
     */
    isSerializable(obj: any) {
        if (obj && ((obj as any).serializeID && this.seriList[(obj as any).serializeID])) {
            let seri:Serializer<any> = this.seriList[(obj as any).serializeID];
            return !!seri;
        }
        return false;
    }
}
