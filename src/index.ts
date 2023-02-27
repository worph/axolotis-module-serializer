import {AxModule} from "axolotis-module-definition";
import {ContainerModule, interfaces} from "inversify";
import {SerializerEngine} from "./services/serializer/SerializerEngine";
import {SerializerEngineName} from "./Identifier";

export * from "./services/serializer/SerializerEngine";
export * from "./services/serializer/Serializer";

export * from "./Identifier";

export class AxSerializerModule implements AxModule{
    getModule(): ContainerModule {
        return new ContainerModule((bind: interfaces.Bind) => {
            bind(SerializerEngineName).toDynamicValue(() => {
                return new SerializerEngine();
            }).inSingletonScope();
        });
    }

}
