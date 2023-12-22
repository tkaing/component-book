import { z } from 'zod';
import ZodMessages from '../../messages.zod.json';
import { nonEmptyString, rejectRegex } from '@/helpers/helper.zod';
import { HanRegex, CyrillicRegex, UpelaRegex } from '@/helpers/helper.regex';

const { regex, email, boolean } = ZodMessages;

export const contactFormSchema = z.object({
    lastname: nonEmptyString
        .refine(rejectRegex([HanRegex]), regex.Sino)
        .refine(rejectRegex([CyrillicRegex]), regex.Cyrillic),

    pro: z.boolean(boolean),

    company: nonEmptyString
        .nullable()
        .refine(rejectRegex([HanRegex]), regex.Sino)
        .refine(rejectRegex([UpelaRegex]), regex.Upela)
        .refine(rejectRegex([CyrillicRegex]), regex.Cyrillic),

    phone: nonEmptyString,

    email: nonEmptyString
        .email(email)
        .refine(rejectRegex([HanRegex]), regex.Sino)
        .refine(rejectRegex([CyrillicRegex]), regex.Cyrillic),

    address1: nonEmptyString
        .refine(rejectRegex([HanRegex]), regex.Sino)
        .refine(rejectRegex([CyrillicRegex]), regex.Cyrillic),

    address2: nonEmptyString
        .nullable()
        .refine(rejectRegex([HanRegex]), regex.Sino)
        .refine(rejectRegex([CyrillicRegex]), regex.Cyrillic),

    address3: nonEmptyString
        .nullable()
        .refine(rejectRegex([HanRegex]), regex.Sino)
        .refine(rejectRegex([CyrillicRegex]), regex.Cyrillic),

    country_code: nonEmptyString,
    city: nonEmptyString,
    postcode: nonEmptyString,
    customer_code: nonEmptyString.nullable(),

    notes: nonEmptyString
        .nullable()
        .refine(rejectRegex([HanRegex]), regex.Sino)
        .refine(rejectRegex([CyrillicRegex]), regex.Cyrillic)
});

export type ContactFormModel = z.infer<typeof contactFormSchema>;
