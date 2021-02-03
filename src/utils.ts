export const isEmptyObject = (obj: object) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const isSSR = typeof window === 'undefined';

/**
 * Removes object entries where the value equals to `undefined`
 *
 * @param obj The object ot remove undefined values
 */
export const removeUndefined = (obj: any) => {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') removeUndefined(obj[key]);
    else if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};

/**
 * Transform snake cased value to camel case
 *
 * @param value The camel case value
 */
export const transformSnakeToCamelCase = (value: string) => {
  return value.replace(/([-_][a-z])/gi, $1 => {
    return $1
      .toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

/**
 * Transform camel cased value to snake case
 *
 * @param value The camel case value
 */
export const transformCamelToSnakeCase = (value: string) => {
  return value.replace(
    /[A-Z]/g,
    (letter: string) => `_${letter.toLowerCase()}`,
  );
};

const isObject = (object: object) => {
  return (
    object === Object(object) &&
    !Array.isArray(object) &&
    typeof object !== 'function'
  );
};

/**
 * Transform an object with snake cased keys to an object with camel case keys
 *
 * @param object The camel case keys object
 */
export const transformSnakeObjectToCamelCase = (
  object: Record<string, string | number | object | any>,
): Record<string, any> => {
  if (isObject(object)) {
    const n: Record<string, any> = {};

    Object.keys(object).forEach(key => {
      n[transformSnakeToCamelCase(key)] = transformSnakeObjectToCamelCase(
        // @ts-ignore
        object[key],
      );
    });

    return n;
  } else if (Array.isArray(object)) {
    return object.map(i => {
      return transformSnakeObjectToCamelCase(i);
    });
  }

  return object;
};

/**
 * Transform an object with camel case keys to an object with snake case keys
 *
 * @param object The camel case keys object
 */
export const transformCamelObjectToSnakeCaseObject = (
  object: Record<string, any>,
): Record<string, any> => {
  if (isObject(object)) {
    const n: Record<string, any> = {};

    Object.keys(object).forEach(key => {
      n[transformCamelToSnakeCase(key)] = transformCamelObjectToSnakeCaseObject(
        // @ts-ignore
        object[key],
      );
    });

    return n;
  } else if (Array.isArray(object)) {
    return object.map(i => {
      return transformCamelObjectToSnakeCaseObject(i);
    });
  }

  return object;
};

// export const transformSnakeObjectToCamelCase = (
//   object: Record<string, any>,
// ) => {
//   const camelCaseObject = Object.keys(object).reduce((acc, key) => {
//     const camelKey = transformSnakeToCamelCase(key);

//     const value: any = isObject(object[key])
//       ? transformSnakeObjectToCamelCase(object[key])
//       : Array.isArray(object[key])
//       ? object[key].map((a: any) => transformSnakeToCamelCase(a))
//       : object[key];

//     return {
//       ...acc,
//       [camelKey]: ...value,
//     } as object;
//   }, {});
//   console.log({ camelCaseObject });
//   return camelCaseObject;
// };
