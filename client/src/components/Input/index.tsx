import { type FormikProps } from 'formik'
import cn from 'classnames'

import css from './styles.module.scss'

export const Input = ({
  name,
  label,
  formik,
  maxWidth,
}: {
  name: string
  label: string
  formik: FormikProps<any>
  maxWidth?: number | string
}) => {
  const state = formik.values
  const errors = formik.errors as Partial<typeof state>
  const touched = formik.touched as Partial<typeof state>
  const invalid = !!touched[name] && !!errors[name]
  const disabled = formik.isSubmitting

  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <input
        type="text"
        className={cn({
          [css.input]: true,
          [css.invalid]: invalid,
        })}
        style={{ maxWidth }}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value)
        }}
        onBlur={() => formik.setFieldTouched(name)}
        value={state[name]}
        name={name}
        id={name}
        disabled={formik.isSubmitting}
      />
      {invalid && <div className="error">{errors[name]}</div>}
    </div>
  )
}
