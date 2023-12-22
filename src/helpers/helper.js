export const isProduction = process.env.NODE_ENV === 'production';

export const requestCredentials = isProduction && process.env.SHARED_APP !== 'appfront' ? 'include' : 'same-origin';

const buildFormDataKey = (key, formSubject) => {
    return `${formSubject}[${key}]`;
};

export const objectToFormData = (obj, formSubject) => {
    const formData = new FormData();

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const formDataKey = buildFormDataKey(key, formSubject);
            formData.append(formDataKey, obj[key]);
        }
    }

    return formData;
};

export const buildInputEvent = (name, value) => ({ target: { name, value } });
