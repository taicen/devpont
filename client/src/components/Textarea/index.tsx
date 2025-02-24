import { type FormikProps } from 'formik'

export const Textarea = ({ name, label, formik }: { name: string; label: string; formik: FormikProps<any> }) => {
  const state = formik.values
  const errors = formik.errors as Partial<typeof state>
  const touched = formik.touched as Partial<typeof state>

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => formik.setFieldTouched(name)}
        value={state[name]}
        name={name}
        id={name}
        disabled={formik.isSubmitting}
      />
      {!!touched[name] && !!errors[name] && <div className="error">{errors[name]}</div>}
    </div>
  )
}
