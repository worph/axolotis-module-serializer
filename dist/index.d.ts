import { AxModule } from "axolotis-module-definition";
import { ContainerModule } from "inversify";
export * from "./services/serializer/SerializerEngine";
export * from "./services/serializer/Serializer";
export * from "./Identifier";
export declare class AxBasicModule implements AxModule {
    getModule(): ContainerModule;
}
//# sourceMappingURL=index.d.ts.map