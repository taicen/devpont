import css from './styles.module.scss'

export const FormItems = ({ children }: { children: React.ReactNode }) => {
  return <div className={css.formItems}>{children}</div>
}
