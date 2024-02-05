import { useEffect, useState } from "react"

export default function useFormValidate(form, formData) {
    const [submittable, setSubmittable] = useState(false)
    useEffect(() => {
        form.validateFields({
                validateOnly: true,
            })
            .then(
                () => {
                setSubmittable(true)
                },
                () => {
                setSubmittable(false)
              }
            )
    }, [formData])

    const submitDisabled = !submittable
    const disableSubmit = () => setSubmittable(false)
    return { submitDisabled, disableSubmit }
}