import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      );
      setStatus({ type: 'success', message: '🚀 Success! Your data is successfully sent.' });
      reset();
    } catch (error) {
      setStatus({ type: 'error', message: '❌ Oops! Something went wrong.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-gray-500 mt-2">Enter your details and I'll get back to you.</p>
        </div>

        {/* <h1 className="text-5xl font-bold text-red-500 underline">TESTING TAILWIND</h1> */}

        <form ref={form} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input 
              name="user_name" 
              {...register("user_name", { required: "Name is required" })} 
              className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${errors.user_name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'}`}
              placeholder="Collins Oyiii"
            />
            {errors.user_name && <p className="text-red-500 text-xs mt-1">{errors.user_name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <input 
              name="user_email" 
              type="email"
              {...register("user_email", { 
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email" }
              })} 
              className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${errors.user_email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'}`}
              placeholder="benoyikocho@gmail.com"
            />
            {errors.user_email && <p className="text-red-500 text-xs mt-1">{errors.user_email.message}</p>}
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <textarea 
              name="message" 
              rows="4"
              {...register("message", { required: "Message cannot be empty" })} 
              className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${errors.message ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'}`}
              placeholder="How can I help you?"
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors duration-300 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Status Notification */}
        {status.message && (
          <div className={`mt-6 p-3 rounded-lg text-center text-sm font-medium ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;