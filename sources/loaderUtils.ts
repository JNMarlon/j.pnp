import * as path from 'path';

export const tryParseURL = (str: string, base?: string | URL | undefined) => {
    try {
        return new URL(str, base);
    } catch {
        return null;
    }
};

export const getFileFormat = (filepath: string): string | null => {
    const ext = path.extname(filepath);
    switch (ext) {
        case '.mjs': {
            return 'module';
        }
        case '.cjs': {
            return 'commonjs';
        }
        case '.wasm': {
            throw new Error(`unknown file extension '.wasm' for ${filepath}`);
        }
        case `.json`: {
            return `json`;
        }
        case `.js`: {
            const pkg = node;
        }
    }
};
