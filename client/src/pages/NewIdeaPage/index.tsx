import css from './styles.module.scss'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'

import { useFormik } from 'formik'

import { withZodSchema } from 'formik-validator-zod'

import { trpc } from '../../lib/trpc'

import { zCreateIdeaInput } from '@taicen/server/src/router/createIdea/input'
import { useState } from 'react'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'

export const NewIdeaPage = () => {
  const [succsessMessage, setSuccsessMessage] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
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
      try {
        await createIdea.mutateAsync(values)
        formik.resetForm()
        setSuccsessMessage(true)
        setTimeout(() => setSuccsessMessage(false), 3000)
      } catch (error: any) {
        setErrorMessage(error.message)
        setTimeout(() => setErrorMessage(null), 3000)
      }
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
        <FormItems>
          <Input name="name" label="Name" formik={formik} maxWidth={500} />
          <Input name="nick" label="Nick" formik={formik} maxWidth={500} />
          <Input name="description" label="Description" formik={formik} maxWidth={'100%'} />
          <Textarea name="text" label="Text" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <div className="error">Some fields are invalid</div>}
          {/* {succsessMessage && <div className={css.success}>Idea created</div>}
        {!!errorMessage && <div className={css.error}>{errorMessage}</div>} */}
          {!!errorMessage && <Alert color="red">{errorMessage}</Alert>}
          {!!succsessMessage && <Alert color="green">Idea created</Alert>}

          <Button loading={formik.isSubmitting}>Submit</Button>
          {/* <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Create Idea'}
        </button> */}
        </FormItems>
      </form>
    </div>
  )
}
