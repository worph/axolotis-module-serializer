import { DefaultSerializer } from './DefaultSerializer';

describe('DefaultSerializer', () => {
    let serializer: DefaultSerializer;

    beforeEach(() => {
        serializer = new DefaultSerializer();
    });

    it('should serialize and deserialize primitive types', () => {
        const testData = [undefined, null, "string", 123, true];
        for (const value of testData) {
            const serialized = serializer.serialize(value);
            const deserialized = serializer.deserialize(serialized);
            expect(deserialized).toBe(value);
        }
    });

    it('should serialize and deserialize arrays', () => {
        const testArray = [1, "string", true, null];
        const serialized = serializer.serialize(testArray);
        const deserialized = serializer.deserialize(serialized);
        expect(deserialized).toEqual(testArray);
    });

    it('should serialize and deserialize objects', () => {
        const testObject = { a: 1, b: "string", c: true, d: null };
        const serialized = serializer.serialize(testObject);
        const deserialized = serializer.deserialize(serialized);
        expect(deserialized).toEqual(testObject);
    });

    it('should serialize and deserialize Maps', () => {
        // @ts-ignore
        const testMap = new Map([["a", 1], ["b", "string"], ["c", true], ["d", null]]);
        const serialized = serializer.serialize(testMap);
        const deserialized = serializer.deserialize(serialized);
        expect(Array.from(deserialized)).toEqual(Array.from(testMap));
    });

    it('should serialize and deserialize typed arrays', () => {
        const testTypedArray = new Int32Array([1, 2, 3, 4]);
        const serialized = serializer.serialize(testTypedArray);
        const deserialized = serializer.deserialize(serialized);
        expect(deserialized).toEqual(testTypedArray);
    });

    it('should serialize and deserialize ArrayBuffer', () => {
        const testData = new ArrayBuffer(8);
        const view = new Int32Array(testData);
        view[0] = 42;
        view[1] = 99;

        const serialized = serializer.serialize(testData);
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
        const deserialized = serializer.deserialize(serialized);

        expect(deserialized instanceof SharedArrayBuffer).toBe(true);
        expect(deserialized.byteLength).toBe(testData.byteLength);

        const deserializedView = new Int32Array(deserialized);
        expect(deserializedView[0]).toBe(view[0]);
        expect(deserializedView[1]).toBe(view[1]);
    });
});
