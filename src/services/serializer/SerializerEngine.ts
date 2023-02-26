import {DefaultSerializer} from "./DefaultSerializer";
import {
    GenericSerialisationData,
    GenericSerializable, SerializableType,
    Serializer,
} from "./Serializer";

export class SerializerEngine {
    seriList: { [id: string]: Serializer<any> } = {};
    defaultSeri = new DefaultSerializer();

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
        let seri:Serializer<any> = this.defaultSeri;
        if (obj && ((obj as any).serializeID && this.seriList[(obj as any).serializeID])) {
            seri = this.seriList[(obj as any).serializeID];
        }
        return seri.serialize(obj, this.replacer);
    }

    deserialize<T extends SerializableType>(data: GenericSerialisationData): T {
        let seri:any = this.defaultSeri;
        if (data && ((data as any).serializeID && this.seriList[(data as any).serializeID])) {
            seri = this.seriList[(data as any).serializeID];
        }
        return seri.deserialize(data, this.reviver);
    }

    getType(): string {
        return SerializerEngine.name;
    }

}
