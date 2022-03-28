export function isEmpty(value) {
    if (typeof value === 'string') {
        return !/\S/.test(value);
    }
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    return isNil(value);
}
export function trim(value) {
    return isNil(value) ? '' : value.trim();
}
export function has(value, prop) {
    return value && typeof value === 'object' && value.hasOwnProperty(prop);
}
export function isFunction(value) {
    return typeof value === 'function';
}
export function get(value, path, defaultValue) {
    let result = value;
    for (const prop of path.split('.')) {
        if (!result || !Reflect.has(result, prop)) {
            return defaultValue;
        }
        result = result[prop];
    }
    return isNil(result) || result === value ? defaultValue : result;
}
export function omit(value, propsToSkip) {
    if (!value) {
        return value;
    }
    const normalizedPropsToSkip = typeof propsToSkip === 'string' ? [propsToSkip] : propsToSkip;
    return Object.keys(value).reduce((result, prop) => {
        if (includes(normalizedPropsToSkip, prop)) {
            return result;
        }
        return Object.assign(result, { [prop]: value[prop] });
    }, {});
}
export function size(value) {
    return isEmpty(value) ? 0 : value.length;
}
export function once(fn) {
    let result;
    return (...args) => {
        if (fn) {
            result = fn.apply(null, args);
            fn = null;
        }
        return result;
    };
}
export function defaultsDeep(target, ...sources) {
    return [target].concat(sources).reduce((result, source) => {
        if (!source) {
            return result;
        }
        Object.keys(source).forEach(prop => {
            if (isNil(result[prop])) {
                result[prop] = source[prop];
                return;
            }
            if (typeof result[prop] === 'object' && !Array.isArray(result[prop])) {
                result[prop] = defaultsDeep(result[prop], source[prop]);
                return;
            }
        });
        return result;
    }, {});
}
export function includes(target, value) {
    if (isNil(target)) {
        return false;
    }
    const index = typeof target === 'string' ? target.indexOf(value) : target.indexOf(value);
    return index > -1;
}
export function isNil(value) {
    return value === undefined || value === null;
}
//# sourceMappingURL=fn.utils.js.map