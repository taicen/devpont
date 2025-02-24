import css from './styles.module.scss'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'

import { useFormik } from 'formik'

import { withZodSchema } from 'formik-validator-zod'

import { trpc } from '../../lib/trpc'

import { zCreateIdeaInput } from '@taicen/server/src/router/createIdea/input'

export const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateIdeaInput),
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values)
    },
  })

  return (
    <div className={css.form}>
      <h1 className={css.title}>New Idea</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div className="error">Some fields are invalid</div>}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Create Idea'}
        </button>
      </form>
    </div>
  )
}
