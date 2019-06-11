const defaultParams = {
    store: null,
    services: {},
};

export function getParams(params) {
    return {...params, ...defaultParams};
}
