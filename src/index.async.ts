import {AxModuleAsync} from "axolotis-module-definition";
import {AsyncContainerModule, interfaces} from "inversify";
import {SerializerEngine} from "./services/serializer/SerializerEngine";
import {SerializerId} from "./Identifier";
export * from "./Identifier";

export class AxBasicModule implements AxModuleAsync{
    getModule(): AsyncContainerModule {
        return new AsyncContainerModule(async (bind: interfaces.Bind) => {
            bind(SerializerId).toDynamicValue(async () => {
                return new SerializerEngine();
            }).inSingletonScope();

        });
    }

}
