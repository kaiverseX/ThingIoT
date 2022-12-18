import {Nullish} from '~/types/interfaceCommon';

export const sleep = (millis: number) => {
  return new Promise((resolve) => setTimeout(resolve, millis));
};

export const milisecondsToMinutesRound = (miliseconds: number): number => {
  return Math.round((miliseconds / 1000 / 60) * 100) / 100;
};

/**
 *
 * @param input any
 * @returns JSON `object`
 * @returns `undefined` if the input is an invalid JSON string.
 *
 * @example
 * safeStringToJSON('null'|'123'|'abc'|'undefined') => undefined
 * safeStringToJSON(null|123|undefined) => undefined
 * safeStringToJSON('{...any}') => ({...any})
 */
export const safeAnyToJSON = (input: any) => {
  try {
    const result = JSON.parse(input);
    return result && typeof result === 'object' ? result : undefined; // typeof null = 'object'
  } catch (_) {
    return undefined;
  }
};

export const isNullist = (input: unknown): input is Nullish =>
  input === null || input === undefined;
