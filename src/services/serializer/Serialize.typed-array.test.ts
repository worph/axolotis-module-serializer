import { DefaultSerializer } from './DefaultSerializer';

describe('DefaultSerializer-typed-array', () => {
    let serializer: DefaultSerializer;

    beforeEach(() => {
        serializer = new DefaultSerializer();
        serializer.setStrictMode(true);
        serializer.keepArrayType(true);
    });

    it('should serialize and deserialize ArrayBuffer', () => {
        const testData = new ArrayBuffer(8);
        const view = new Int32Array(testData);
        view[0] = 42;
        view[1] = 99;

        const serialized = serializer.serialize(testData);
        expect(serialized instanceof ArrayBuffer).toBe(true);
        const deserialized = serializer.deserialize(serialized);

        expect(deserialized instanceof ArrayBuffer).toBe(true);
        expect(deserialized.byteLength).toBe(testData.byteLength);

        const deserializedView = new Int32Array(deserialized);
        expect(deserializedView[0]).toBe(view[0]);
        expect(deserializedView[1]).toBe(view[1]);
    });

    it('should serialize and deserialize SharedArrayBuffer', () => {
        const testData = new SharedArrayBuffer(8);
        const view = new Int32Array(testData);
        view[0] = 42;
        view[1] = 99;

        const serialized = serializer.serialize(testData);
        expect(serialized instanceof SharedArrayBuffer).toBe(true);
        const deserialized = serializer.deserialize(serialized);

        expect(deserialized instanceof SharedArrayBuffer).toBe(true);
        expect(deserialized.byteLength).toBe(testData.byteLength);

        const deserializedView = new Int32Array(deserialized);
        expect(deserializedView[0]).toBe(view[0]);
        expect(deserializedView[1]).toBe(view[1]);
    });
});
