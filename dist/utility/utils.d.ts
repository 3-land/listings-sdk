import { FileData } from "../library/instructions/store/uploadFilesIryis";
export declare function bytesToU32(slice: any): number;
export declare const cyrb53: (str: any, seed?: number) => number;
export declare const sleep: (t: any) => Promise<unknown>;
export declare const nowS: () => number;
export declare const validateSolAddress: (address: any) => boolean;
export declare const checkFileType: (file: any) => "image/png" | "image/gif" | "image/jpeg" | "image/webp" | "video/mp4" | "model/gltf-binary" | "video/webp" | "audio" | null;
export declare const checkCategory: (file: any) => "image" | "audio" | "video" | "vr" | null;
export declare function normalizeFileData(fileData: any): Promise<FileData>;
export declare function getUrlFileType(fileUrl: string): Promise<string>;
export declare function getFileType(file: any): string | null;
export declare function validateFileType(type: string): void;
export declare function getFileCategory(file: any): string | null;
export declare function isAnimatable(type: string): boolean;
//# sourceMappingURL=utils.d.ts.map