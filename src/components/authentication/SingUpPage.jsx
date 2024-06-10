import { zodResolver } from '@hookform/resolvers/zod'
import { user } from '../../assets/index'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { getUser, signup } from '../../services/userServices'
import { Navigate } from 'react-router-dom'

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name should be atleast 3 character long.' }),
    email: z.string().email({ message: 'Please enter a valid email.' }).min(3),
    password: z.string().min(6),
    confirmpassword: z.string().min(6),
    address: z
      .string()
      .min(15, { message: 'Address must be atleast 15 character' }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: 'Confirm password does not match password',
    path: ['confirmpassword'],
  })

function SingUpPage() {
  const [profilePic, setProfilePic] = useState(null)
  const [formError, setFormError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) })

  const onSubmit = async (formData) => {
    try {
      await signup(formData, profilePic)
      window.location = '/'
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFormError(error.response.data.message)
      }
    }
  }

  if (getUser()) {
    return <Navigate to="/" />
  }

  return (
    <section className="items-center flex justify-center">
      <form
        className="w-2/5 py-8 px-12 mt-8 *:mb-3 bg-white shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-4xl mb-7 text-center font-bold">SignUp Form</h2>
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center">
            <img
              className="w-[80px] h-[80px] object-cover rounded-full object-center"
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              alt="user image"
            />
          </div>
          <label
            htmlFor="profile_img"
            className="w-36 px-2 bg-[#6457f9] text-white rounded-sm text-center py-1 mt-2 uppercase cursor-pointer text-nowrap"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="profile_img"
            className="hidden"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>

        <div className="flex gap-4">
          <label className="labels flex flex-col w-2/4" htmlFor="name">
            Name
            <input
              className="field "
              type="text"
              id="name"
              placeholder="Enter your name"
              {...register('name')}
            />
            {errors.name && (
              <em className="text-red-400">{errors.name.message}</em>
            )}
          </label>

          <label className="labels flex flex-col w-2/4" htmlFor="email">
            Email
            <input
              className="field"
              type="email"
              placeholder="Enter your email"
              id="email"
              {...register('email')}
            />
            {errors.email && (
              <em className="text-red-400">{errors.email.message}</em>
            )}
          </label>
        </div>
        <div className="flex gap-4">
          <label htmlFor="password" className="labels flex flex-col w-2/4">
            Password
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="field"
              {...register('password')}
            />
            {errors.password && (
              <em className="text-red-400">{errors.password.message}</em>
            )}
          </label>

          <label
            htmlFor="confirepassword"
            className="labels flex flex-col w-2/4"
          >
            Confirm Password
            <input
              type="password"
              id="confirepassword"
              placeholder="Enter confirm password"
              className="field"
              {...register('confirmpassword')}
            />
            {errors.confirmpassword && (
              <em className="text-red-400">{errors.confirmpassword.message}</em>
            )}
          </label>
        </div>
        <label htmlFor="address" className="labels flex flex-col w-full">
          Delivery Address
          <textarea
            id="address"
            className="field placeholder:text-gray-400"
            {...register('address')}
            placeholder="Enter delivery address"
          ></textarea>
          {errors.address && (
            <em className="text-red-400">{errors.address.message}</em>
          )}
        </label>
        {formError && <em className="text-red-400">{formError}</em>}
        <button
          className="h-10 w-full mt-6 mx-2 px-4 py-2 text-lg font-medium border-none rounded-sm self-center bg-[#6457f9] text-white cursor-pointer text-nowrap"
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  )
}
export default SingUpPage
