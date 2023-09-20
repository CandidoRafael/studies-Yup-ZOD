import { useForm } from 'react-hook-form';
import './App.css'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useEffect } from 'react'


const schema = Yup.object().shape({
  password: Yup.string().min(6, 'A senha deve ter no minimo 6 caracteres').required('Campo Obrigatório'),
  confirmPassword: Yup.string()
     .oneOf([Yup.ref('password')],'As senhas precisam ser iguais')
     .required('Campo Obrigatório')
})

const asyncFn = async () => {
   const myPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve('Hello World')
      }, 3000)
    })

    return myPromise
} 
 
function App() {

  // A handleSubmit , recebe uma função como parametro 
  // Para usar o isSubmitting , a função deve ser assíncrona
  const { register, handleSubmit, formState, reset, setFocus } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const { errors, isSubmitting } = formState;

  console.log('erros', errors)
  console.log('isSubmitting', isSubmitting)

  const handleSubmitData = async (data: any)  => {
      console.log('submit,', data)

      await asyncFn()

      reset()
  }

  useEffect(() => {
      setFocus('password')
  },[setFocus])

  return (
    <form onSubmit={handleSubmit(handleSubmitData)}>
        <h2>Reset Password</h2>

        <input {...register('password')}  type="password" 
        placeholder='Senha' />

        {errors.password && (
          <p>{errors.password.message}</p>
        )}

        <input {...register('confirmPassword')} type="password" 
        placeholder='Confirmação de senha' />

        {errors.confirmPassword && (
          <p>{errors.confirmPassword.message}</p>
        )}

        <button type='submit'disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
    </form>
  );
}

export default App;
