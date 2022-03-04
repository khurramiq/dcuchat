import { useState } from 'react';

export function useForm(initialFormData = {}) {
    const [formData, updateFormData] = useState(initialFormData)

    const handleField = ({ target }) => {
        updateFormData({ ...formData, [target.name]: target.value });
    }

    return { formData, handleField }
}