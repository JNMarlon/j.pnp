import * as loaderUtils from '../../loaderUtils';

export const load = async (
    urlString: string,
    context: { format: string | null | undefined; importAssertions?: { type?: 'json' }; importAttributes?: { type?: 'json' } },
    nextLoad: typeof load,
): Promise<{ format: string; source?: string; shortCircuit: boolean }> => {
    const url = loaderUtils.tryParseURL(urlString);

    if (url?.protocol !== 'file:') return nextLoad(urlString, context, nextLoad);

    const filePath = fileURLToPath(url);
    const format = loaderUtils.getFileFormat(filePath);

    if (!format) return nextLoad(urlString, context, nextLoad);

    /**
     * @todo: Implement the rest of the function
     *
     * **/
    return;
};
