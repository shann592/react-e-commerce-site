import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getUser, login } from '../../services/userServices'
import { Navigate, useLocation } from 'react-router-dom'
const schema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).min(3),
  password: z
    .string()
    .min(8, { message: 'Password should be atleast 8 character long' }),
})
function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })
  const location = useLocation()
  const [formError, setFormError] = useState('')

  const onSubmit = async (data) => {
    try {
      await login(data)
      window.location = location.state ? location.state.from : '/'
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFormError(error.response.data.message)
      }
    }
  }
  if (getUser()) {
    return <Navigate to="/" />
  }

  // useEffect(() => {
  //   if (getUser()) {
  //     navigate('/')
  //   }
  // }, [])
  return (
    <section className="items-center flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/3 py-8 px-12 mt-8 bg-white shadow-md"
      >
        <h2 className="text-4xl mb-7 text-center font-bold">Login Form</h2>
        <div className="flex flex-col mb-4">
          <label className="text-lg font-semibold mb-1" htmlFor="email">
            Email
          </label>
          <input
            {...register('email')}
            id="email"
            className="py-1 h-35px px-2 text-lg font-medium outline-none bg-gray-100 rounded-sm"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <em className="text-red-400">{errors.email.message}</em>
          )}

          <label className="text-lg font-semibold mb-1" htmlFor="password">
            Password
          </label>
          <input
            {...register('password')}
            id="password"
            className="py-1 h-35px px-2 text-lg font-medium outline-none bg-gray-100 rounded-sm"
            type="password"
            name="password"
            placeholder="Enter your phone password"
          />
          {errors.password && <em className="text-red-400">{formError}</em>}
          <button
            className="h-10 w-full mt-6 mx-2 px-4 py-2 text-lg font-medium border-none rounded-sm self-center bg-[#6457f9] text-white cursor-pointer text-nowrap"
            type="submit"
          >
            Submit
          </button>
          {formError && (
            <em className="text-red-400">{errors.password.message}</em>
          )}
        </div>
      </form>
    </section>
  )
}
export default LoginPage
