import { z } from 'zod';
import ZodMessages from '../messages.zod.json';

export const nonEmptyString = z.string(ZodMessages.string).trim().min(1, ZodMessages.min);

export const rejectRegex = (regexList: RegExp[]) => (value: any) =>
    regexList.filter(regex => !regex.test(value)).length === regexList.length;
