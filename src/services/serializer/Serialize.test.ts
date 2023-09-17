import {
    GenericSerialisationData, GenericSerializable,
    SerializableType, Serializer,
} from "./Serializer";
import { SerializerEngine } from "./SerializerEngine";

class ASerializer implements Serializer<A>{
    deserialize(data: GenericSerialisationData, reviver: (obj: GenericSerialisationData) => GenericSerializable): A {
        const a = new A();
        a.data = reviver((data as A).data) as string;
        return a;
    }

    serialize(data: A, replacer: (obj: GenericSerializable) => GenericSerialisationData): any {
        return {
            data:replacer(data.data)
        };
    }

    getSerializeID(): string {
        return A.name;
    }
}

class A implements SerializableType{
    data:string = "a data";
    mkData(){
        this.data = "new A data"
    }

    getSerialisationID(): string {
        return A.name;
    }
}

class BSerializer implements Serializer<B>{
    deserialize(data: any, reviver: (obj: GenericSerialisationData) => GenericSerializable): B {
        const b = new B();
        b.data = reviver(data.data) as string;
        b.a = reviver(data.a) as A;
        return b;
    }

    serialize(data: B, replacer: (obj: GenericSerializable) => GenericSerialisationData): any {
        return {
            data : replacer(data.data),
            a: replacer(data.a),
        };
    }

    getSerializeID(): string {
        return B.name;
    }

}

class B implements SerializableType{
    a:A = new A();
    data:string = "b data";

    mkData(){
        this.data = "b new data";
        this.a.mkData();
    }

    getSerialisationID(): string {
        return B.name;
    }
}

test('serialize/deserialiser', () => {
    const serializer = new SerializerEngine();

    serializer.registerDataType(new ASerializer());
    serializer.registerDataType(new BSerializer());

    const b1 = new B();
    b1.mkData();
    const serialisationData = serializer.serialize(b1);

    const b2 = serializer.deserialize<B>(serialisationData);


    expect(JSON.stringify(b2)).toBe(JSON.stringify(b1));
});

test('serialize/deserialiser default', () => {
    const serializer = new SerializerEngine();

    serializer.registerDataType(new ASerializer());
    serializer.registerDataType(new BSerializer());

    const b1 = new B();
    b1.mkData();
    const serialisationData = serializer.serialize(b1);

    const b2 = serializer.deserialize<B>(serialisationData);


    expect(JSON.stringify(b2)).toBe(JSON.stringify(b1));
});
