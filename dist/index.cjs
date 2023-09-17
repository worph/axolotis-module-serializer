var y=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var g=Object.prototype.hasOwnProperty;var d=(n,e)=>{for(var i in e)y(n,i,{get:e[i],enumerable:!0})},h=(n,e,i,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of b(e))!g.call(n,t)&&t!==i&&y(n,t,{get:()=>e[t],enumerable:!(r=A(e,t))||r.enumerable});return n};var m=n=>h(y({},"__esModule",{value:!0}),n);var D={};d(D,{AxSerializerModule:()=>S,SerializerEngine:()=>l,SerializerEngineName:()=>u});module.exports=m(D);var z=require("inversify");var f=class{strictMode=!1;setStrictMode(e){this.strictMode=e}arrayTypes={ArrayBuffer,Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array};encodeTypedArray(e){let i="",r=e instanceof ArrayBuffer?e:e.buffer,t=new Uint8Array(r);for(let a of t)i+=String.fromCharCode(a);let s=e.constructor.name;if(typeof btoa<"u")return s+":"+btoa(i);if(typeof Buffer<"u")return s+":"+Buffer.from(i,"binary").toString("base64");throw new Error("Cannot encode ArrayBuffer to Base64 string")}decodeTypedArray(e){let[i,r]=e.split(":");if(i==="ArrayBuffer"){let a=typeof atob<"u"?atob(r):Buffer.from(r,"base64").toString("binary"),c=new ArrayBuffer(a.length),p=new Uint8Array(c);for(let o=0;o<a.length;o++)p[o]=a.charCodeAt(o);return c}if(!this.arrayTypes.hasOwnProperty(i))return e;let t;if(typeof atob<"u")t=atob(r);else if(typeof Buffer<"u")t=Buffer.from(r,"base64").toString("binary");else throw new Error("Cannot decode Base64 string to ArrayBuffer");let s=new Uint8Array(t.length);for(let a=0;a<t.length;a++)s[a]=t.charCodeAt(a);return new this.arrayTypes[i](s.buffer)}deserialize(e,i){if(i||(i=r=>this.deserialize(r)),e!==void 0){if(e===null)return null;if(typeof e=="string")return this.decodeTypedArray(e);if(typeof e=="number"||typeof e=="boolean")return e;if(e.getSerialisationID){console.warn("Cannot use default to deserialize a serializable object :"+e.getSerialisationID());return}if(e.serializeID){console.warn("Cannot use default to deserialize a serializable object :"+e.serializeID);return}if(e.type==="Map"){let r=new Map;for(let[t,s]of e.value)r.set(i(t),i(s));return r}else if(e.type==="Set"){let r=new Set;for(let t of e.value)r.add(i(t));return r}else if(e instanceof Array){let r=[];for(let t=0;t<e.length;t++)r[t]=i(e[t]);return r}else if(e instanceof Object){let r={};for(let t in e)r[t]=i(e[t]);return r}else return e}}serialize(e,i){if(i||(i=r=>this.serialize(r)),e!==void 0){if(e===null)return null;if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return e;for(let r in this.arrayTypes)if(e instanceof Object&&e instanceof this.arrayTypes[r])return this.encodeTypedArray(e);if(e.getSerialisationID)throw new Error("Cannot use default to deserialize a serializable object :"+e.getSerialisationID());if(e.serializeID)throw new Error("Cannot use default to deserialize a serializable object :"+e.serializeID);if(e instanceof Array){for(let r=0;r<e.length;r++)e[r]=i(e[r]);return e}else if(e instanceof Map){let r=new Map;for(let[t,s]of e)r.set(i(t),i(s));return{type:"Map",value:Array.from(r.entries())}}else if(e instanceof Set){let r=new Set;for(let t of e)r.add(i(t));return{type:"Set",value:Array.from(r)}}else if(e instanceof Object){this.strictMode&&console.warn("Strict mode is enabled and Object are not allowed");let r={};for(let t in e)r[t]=i(e[t]);return r}else{if(this.strictMode)throw new Error("Strict mode is enabled and Object are not allowed");return JSON.parse(JSON.stringify(e))}}}getSerializeID(){return null}};var l=class{seriList={};defaultSeri=new f;getDefaultSerializer(){return this.defaultSeri}registerDataType(e){this.seriList[e.getSerializeID()]=e}reviver=e=>this.deserialize(e);replacer=e=>this.serialize(e);serializeToString(e){return JSON.stringify(this.serialize(e))}deserializeFromString(e){return this.deserialize(JSON.parse(e))}serialize(e){if(e&&e.getSerialisationID&&this.seriList[e.getSerialisationID()]){let i=this.seriList[e.getSerialisationID()];if(!i)throw new Error("Serializer not found for "+e.getSerialisationID);let r=i.serialize(e,this.replacer);return r.serializeID=e.getSerialisationID(),r}else return this.defaultSeri.serialize(e,this.replacer)}deserialize(e){let i=this.defaultSeri;return e&&e.serializeID&&this.seriList[e.serializeID]&&(i=this.seriList[e.serializeID]),i.deserialize(e,this.reviver)}isSerializable(e){return e&&e.getSerialisationID&&this.seriList[e.getSerialisationID()]?!!this.seriList[e.getSerialisationID()]:!1}clone(e){return this.deserialize(this.serialize(e))}};var u=Symbol.for("SerializerEngineName");var S=class{getModule(){return new z.ContainerModule(e=>{e(u).toDynamicValue(()=>new l).inSingletonScope()})}};0&&(module.exports={AxSerializerModule,SerializerEngine,SerializerEngineName});
//# sourceMappingURL=index.cjs.map