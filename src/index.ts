import {AxModule} from "axolotis-module-definition";
import {ContainerModule, interfaces} from "inversify";
import {SerializerEngine} from "./services/serializer/SerializerEngine";
import {SerializerId} from "./Identifier";

export * from "./services/serializer/SerializerEngine";
export * from "./services/serializer/Serializer";

export * from "./Identifier";

export class AxSerializerModule implements AxModule{
    getModule(): ContainerModule {
        return new ContainerModule((bind: interfaces.Bind) => {
            bind(SerializerEngine.name).toDynamicValue(() => {
                return new SerializerEngine();
            }).inSingletonScope();
            bind(SerializerId).toDynamicValue(() => {
                return new SerializerEngine();
            }).inSingletonScope();
        });
    }

}
