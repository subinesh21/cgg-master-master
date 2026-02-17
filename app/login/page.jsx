import React from 'react'
import LoginForm from '../ui/login/loginForm/loginForm'

export const metadata = {
  title: "Admin Login - Chennai Green Gifts",
  description: "Chennai Green Gifts Admin Area Only for Official Use",
};
function Login() {
  
  return (
    <div className='w-screen h-screen'>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <div style={{width:"100%", display:"flex"}}>
            <img
              className="mx-auto h-20 w-auto"
              src="/assets/images/logos/logo.png"
              alt="Chennai Green Gifts"
            />
          </div>
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/contact" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Contact Us
            </a>
          </p>
        </div>
      </div>
      <div className="contact-shapes">
          <img
            className="leaf"
            src="/assets/images/shapes/leaf-1.png"
            alt="Leaf"
          />
          <img
            className="shape"
            src="/assets/images/shapes/contact-shape.png"
            alt="Shape"
          />
          <img
            className="two-leaf"
            src="/assets/images/shapes/two-lear.png"
            alt="Leaf"
          />
        </div>
    </div>
    
  )
}

export default Login