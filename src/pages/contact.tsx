import React, { useState } from 'react';

import { PageProps } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Button } from '../components/button';
import * as Alert from '../components/alert';

const Contact = ({ location }: PageProps) => {
  const [contact, setContact] = useState({
    // Static form default attributes
    name: '',
    email: '',
    phone: '',
    subject: 'keliris.dev enquiry',
    message: '',
    // Custom attributes must start with $
    $company: '',
    honeypot: '', // if any value received in this field, form submission will be ignored.
    replyTo: '@', // this will set replyTo of email to email address entered in the form
    accessKey: '9632cf3b-3266-4409-9cf9-fb54911f2ed5', // get your access key from https://www.staticforms.xyz
  });

  const [response, setResponse] = useState({
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await res.json();

      if (json.success) {
        setResponse({
          type: 'success',
          message: 'Thank you for reaching out to me.',
        });
      } else {
        setResponse({
          type: 'error',
          message: json.message,
        });
      }
      setIsLoading(false);
    } catch (e) {
      setResponse({
        type: 'error',
        message: e.message,
      });
      setIsLoading(false);
    }
  };

  return (
    <Layout isArticle>
      <SEO
        path={location.pathname}
        title="Contact"
        description="Contact Alexander Keliris (Rigellute)"
      />

      <h2 className="text-3xl font-extrabold tracking-tight leading-9 sm:text-4xl sm:leading-10">
        Let's work together
      </h2>
      <p className="mt-4 text-lg text-gray-500 leading-7 sm:mt-3">
        I'd love to hear from you! Send me a message using this form.
      </p>
      <form
        method="POST"
        action="https://api.staticforms.xyz/submit"
        onSubmit={handleSubmit}
        className="mt-9 grid grid-cols-1 row-gap-6 sm:grid-cols-2 sm:col-gap-8"
      >
        {/* Honeypot */}
        <div className="hidden">
          <label className="label">Title</label>
          <input
            type="text"
            name="honeypot"
            className="hidden"
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 leading-5"
          >
            Name
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              id="name"
              required
              name="name"
              onChange={handleChange}
              className="block w-full form-input transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 leading-5"
          >
            Email
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              id="email"
              name="email"
              required
              type="email"
              onChange={handleChange}
              className="block w-full form-input transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex justify-between">
            <label
              htmlFor="$company"
              className="block text-sm font-medium text-gray-700 leading-5"
            >
              Company
            </label>
            <span className="text-sm text-gray-500 leading-5">Optional</span>
          </div>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              onChange={handleChange}
              id="$company"
              name="$company"
              className="block w-full form-input transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex justify-between">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 leading-5"
            >
              Phone
            </label>
            <span className="text-sm text-gray-500 leading-5">Optional</span>
          </div>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              onChange={handleChange}
              id="phone"
              name="phone"
              className="block w-full form-input transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="flex justify-between">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 leading-5"
            >
              How can I help you?
            </label>
            <span className="text-sm text-gray-500 leading-5">
              Max. 500 characters
            </span>
          </div>
          <div className="relative mt-1 rounded-md shadow-sm">
            <textarea
              maxLength={500}
              id="message"
              name="message"
              required
              rows={4}
              onChange={handleChange}
              className="block w-full form-textarea transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            ></textarea>
          </div>
        </div>
        <div className="sm:col-span-2">
          <Alert.Success
            message={response.message}
            canShow={response.type === 'success'}
          />
          <Alert.Error
            message={response.message}
            canShow={response.type === 'error'}
          />
        </div>

        <div className="text-right sm:col-span-2">
          <Button type="submit">
            <div className={`${isLoading ? 'spinner' : ''}`}>Submit</div>
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default Contact;
