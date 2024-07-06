import path from 'path';

enum PathType {
    File,
    Portable,
    Native,
}

export type PortablePath = string & { __pathType: PathType.File | PathType.Portable };
export type NativePath = string & { __pathType?: PathType.File | PathType.Native };

export type Filename = string & { __pathType: PathType.File };
export type Path = PortablePath | NativePath;

export const Filename = {
    home: `~` as Filename,
    nodeModules: `node_modules` as Filename,
    manifest: `package.json` as Filename,
    lockfile: `yarn.lock` as Filename,
    virtual: `__virtual__` as Filename,
    pnpCjs: `.pnp.cjs` as Filename,
    pnpData: `.pnp.data.json` as Filename,
    pnpEsmLoader: `.pnp.loader.mjs` as Filename,
    rc: `.yarnrc.yml` as Filename,
    env: `.env` as Filename,
};

export type TolerateLiterals<T> = {
    [K in keyof T]: ValidateLiteral<T[K]> | PortablePath | Filename;
};

export type ValidateLiteral<T> =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    T extends `${infer X}` ? T : never;

export const npath: PathUtils<NativePath> & ConvertUtils = Object.create(path) as any;
export const ppath: PathUtils<PortablePath> & PortablePathGenerics = Object.create(path.posix) as any;

export interface PortablePathGenerics {
    join<T extends Array<string>>(...segments: TolerateLiterals<T>): PortablePath;
    resolve<T extends string>(...pathSegments: Array<PortablePath | Filename | TolerateLiterals<T>>): PortablePath;
}
export interface PathUtils<P extends Path> {
    cwd(): P;

    //  ts가 추론을 잘못하는 경우가 종종 있어서 NoInfer를 사용함
    join(...paths: Array<NoInfer<P> | Filename>): P;
    resolve(...pathSegments: Array<NoInfer<P> | Filename>): P;

    normalize(p: P): P;
    isAbsolute(path: P): boolean;
    relative(from: P, to: P): P;
    dirname(p: P): P;
    basename(p: P, ext?: string): Filename;
    extname(p: P): string;

    readonly sep: P;
    readonly delimiter: string;

    parse(pathString: P): ParsedPath<P>;
    format(pathObject: FormatInputPathObject<P>): P;

    contains(from: P, to: P): P | null;
}

export interface ConvertUtils {
    fromPortablePath: (p: Path) => NativePath;
    toPortablePath: (p: Path) => PortablePath;
}

export interface ParsedPath<P extends Path> {
    root: P;
    dir: P;
    base: Filename;
    ext: string;
    name: Filename;
}

export interface FormatInputPathObject<P extends Path> {
    root?: P;
    dir?: P;
    base?: Filename;
    ext?: string;
    name?: Filename;
}

type NoInfer<T> = [T][T extends any ? 0 : never];
