import {AxModuleAsync} from "axolotis-module-definition";
import {AsyncContainerModule, interfaces} from "inversify";
import {SerializerEngine} from "./services/serializer/SerializerEngine";
import {SerializerEngineName} from "./Identifier";
export * from "./Identifier";

export class AxSerializerModule implements AxModuleAsync{
    getModule(): AsyncContainerModule {
        return new AsyncContainerModule(async (bind: interfaces.Bind) => {
            bind(SerializerEngineName).toDynamicValue(async () => {
                return new SerializerEngine();
            }).inSingletonScope();

        });
    }

}
