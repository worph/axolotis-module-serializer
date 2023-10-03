import{ContainerModule as z}from"inversify";var o=class{strictMode=!1;setStrictMode(e){this.strictMode=e}arrayTypes={SharedArrayBuffer:typeof SharedArrayBuffer<"u"?SharedArrayBuffer:ArrayBuffer,ArrayBuffer,Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array};encodeTypedArray(e){let i="",r;typeof SharedArrayBuffer<"u"?r=e instanceof ArrayBuffer||e instanceof SharedArrayBuffer?e:e.buffer:r=e instanceof ArrayBuffer?e:e.buffer;let t=new Uint8Array(r);for(let n of t)i+=String.fromCharCode(n);let a=e.constructor.name;if(typeof btoa<"u")return a+":"+btoa(i);if(typeof Buffer<"u")return a+":"+Buffer.from(i,"binary").toString("base64");throw new Error("Cannot encode ArrayBuffer to Base64 string")}decodeTypedArray(e){let[i,r]=e.split(":");if(i==="ArrayBuffer"||i==="SharedArrayBuffer"){let n=typeof atob<"u"?atob(r):Buffer.from(r,"base64").toString("binary"),s;typeof SharedArrayBuffer<"u"&&i==="SharedArrayBuffer"?s=new SharedArrayBuffer(n.length):s=new ArrayBuffer(n.length);let c=new Uint8Array(s);for(let l=0;l<n.length;l++)c[l]=n.charCodeAt(l);return s}if(!this.arrayTypes.hasOwnProperty(i))return e;let t;if(typeof atob<"u")t=atob(r);else if(typeof Buffer<"u")t=Buffer.from(r,"base64").toString("binary");else throw new Error("Cannot decode Base64 string to ArrayBuffer");let a=new Uint8Array(t.length);for(let n=0;n<t.length;n++)a[n]=t.charCodeAt(n);return new this.arrayTypes[i](a.buffer)}deserialize(e,i){if(i||(i=r=>this.deserialize(r)),e!==void 0){if(e===null)return null;if(typeof e=="string")return this.decodeTypedArray(e);if(typeof e=="number"||typeof e=="boolean")return e;if(e.getSerialisationID){console.warn("Cannot use default to deserialize a serializable object :"+e.getSerialisationID());return}if(e.serializeID){console.warn("Cannot use default to deserialize a serializable object :"+e.serializeID);return}if(e.type==="Map"){let r=new Map;for(let[t,a]of e.value)r.set(i(t),i(a));return r}else if(e.type==="Set"){let r=new Set;for(let t of e.value)r.add(i(t));return r}else if(e instanceof Array){let r=[];for(let t=0;t<e.length;t++)r[t]=i(e[t]);return r}else if(e instanceof Object){let r={};for(let t in e)r[t]=i(e[t]);return r}else return e}}serialize(e,i){if(i||(i=r=>this.serialize(r)),e!==void 0){if(e===null)return null;if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return e;for(let r in this.arrayTypes)if(e instanceof this.arrayTypes[r])return this.encodeTypedArray(e);if(e.getSerialisationID)throw new Error("Cannot use default to deserialize a serializable object :"+e.getSerialisationID());if(e.serializeID)throw new Error("Cannot use default to deserialize a serializable object :"+e.serializeID);if(e instanceof Array){for(let r=0;r<e.length;r++)e[r]=i(e[r]);return e}else if(e instanceof Map){let r=new Map;for(let[t,a]of e)r.set(i(t),i(a));return{type:"Map",value:Array.from(r.entries())}}else if(e instanceof Set){let r=new Set;for(let t of e)r.add(i(t));return{type:"Set",value:Array.from(r)}}else if(e instanceof Object){this.strictMode&&console.warn("Strict mode is enabled and Object are not allowed");let r={};for(let t in e)r[t]=i(e[t]);return r}else{if(this.strictMode)throw new Error("Strict mode is enabled and Object are not allowed");return JSON.parse(JSON.stringify(e))}}}getSerializeID(){return null}};var f=class{seriList={};defaultSeri=new o;getDefaultSerializer(){return this.defaultSeri}registerDataType(e){this.seriList[e.getSerializeID()]=e}reviver=e=>this.deserialize(e);replacer=e=>this.serialize(e);serializeToString(e){return JSON.stringify(this.serialize(e))}deserializeFromString(e){return this.deserialize(JSON.parse(e))}serialize(e){if(e&&e.getSerialisationID&&this.seriList[e.getSerialisationID()]){let i=this.seriList[e.getSerialisationID()];if(!i)throw new Error("Serializer not found for "+e.getSerialisationID);let r=i.serialize(e,this.replacer);return r.serializeID=e.getSerialisationID(),r}else return this.defaultSeri.serialize(e,this.replacer)}deserialize(e){let i=this.defaultSeri;return e&&e.serializeID&&this.seriList[e.serializeID]&&(i=this.seriList[e.serializeID]),i.deserialize(e,this.reviver)}isSerializable(e){return e&&e.getSerialisationID&&this.seriList[e.getSerialisationID()]?!!this.seriList[e.getSerialisationID()]:!1}clone(e){return this.deserialize(this.serialize(e))}};var u=Symbol.for("SerializerEngineName");var S=class{getModule(){return new z(e=>{e(u).toDynamicValue(()=>new f).inSingletonScope()})}};export{S as AxSerializerModule,f as SerializerEngine,u as SerializerEngineName};
//# sourceMappingURL=index.js.map