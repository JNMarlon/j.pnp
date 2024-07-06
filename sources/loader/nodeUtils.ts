import { NativePath, npath } from '../../fslib/path';
import * as fs from 'fs';

export const readPackageScope = async (checkPath: NativePath) => {
    const rootSeparatorIndex = checkPath.indexOf(npath.sep);
    let separatorIndex;
    let _checkPath = checkPath;

    do {
        separatorIndex = checkPath.lastIndexOf(npath.sep);
        _checkPath = _checkPath.slice(0, separatorIndex);
        if (checkPath.endsWith(`${npath.sep}node_modules`)) return false;

        const pJson = readPackage(checkPath + npath.sep);

        if (pJson) {
            return {
                data: pJson,
                path: checkPath,
            };
        }
    } while (separatorIndex > rootSeparatorIndex);
};

export const readPackage = (requestPath: NativePath) => {
    const jsonPath = npath.resolve(requestPath, `package.json`);
    if (!fs.existsSync(jsonPath)) return null;

    return JSON.parse(fs.readFileSync(jsonPath, `utf-8`));
};
