'use client'; // makes this a client component. ALL code and data on a client component goes to the client

import { useActionState } from "react";
import { createCustomer } from "../customers/actions";
import ContinueWithGoogle from "./ContinueWithGoogle/ContinueWithGoogle";

export default function NewCustomerForm() {
  const [state, dispatchAction, isPending] = useActionState(createCustomer,{ success: false, error: null});

  if(state.success) {
    // display toast that confirms that the person registered
  }

  return (
    <form action={dispatchAction} className="flex flex-col">
      <p className='text-red-500 text-xl text-medium m-4'>{state?.error}</p>
      <h1 className="mb-4 text-5xl font-bold">New Customer</h1>
      <p className="mb-14 text-xl text-[#718096]">
        Create a Rydio account for free
      </p>

      {/* TODO: remove default test values before deployment */}

      {/* First & Last Name */}
      <div className="mb-6 grid grid-cols-2 gap-x-8">
        <div className="flex flex-col">
          <label
            htmlFor="firstName"
            className="mb-3 font-medium tracking-wide text-[#718096]"
          >
            First Name
          </label>
          <input
            name="firstName"
            placeholder="John"
            id="firstName"
            defaultValue="Tommy"
            className="rounded-xl border border-[#cbd5e0] bg-[#f2f6f8] p-3 placeholder:text-[#768296]"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="lastName"
            className="mb-3 font-medium tracking-wide text-[#718096]"
          >
            Last Name
          </label>
          <input
            name="lastName"
            placeholder="Smith"
            id="lastName"
            defaultValue="Hilfiger"
            className="rounded-xl border border-[#cbd5e0] bg-[#f2f6f8] p-3 placeholder:text-[#768296]"
            required
          />
        </div>
      </div>

      {/* Email */}
      <label
        htmlFor="email"
        className="mb-3 font-medium tracking-wide text-[#718096]"
      >
        Email
      </label>
      <input
        name="email"
        placeholder="me@example.com"
        id="email"
        type="email"
        defaultValue={`tommy${Math.round(Math.random() * 10000)}@example.com`}
        className="mb-3 rounded-xl border border-[#cbd5e0] bg-[#f2f6f8] p-3 placeholder:text-[#768296]"
        required
      />

      {/* Email Updates */}
      <div className="mb-8">
        <input
          name="wantsUpdates"
          id="wantsUpdates"
          type="checkbox"
          value="giveMeUpdates"
          className="accent-rydio-green mr-2 mb-0.75 size-4 cursor-pointer align-middle"
        />
        <label
          htmlFor="wantsUpdates"
          className="mb-3 font-medium tracking-wide text-[#718096]"
        >
          Send me the newest updates, deals, and special offers
        </label>
      </div>

      {/* Phone Number */}
      <label
        htmlFor="phone"
        className="mb-3 font-medium tracking-wide text-[#718096]"
      >
        Phone
      </label>
      <input
        name="phone"
        placeholder="+1 (123) 555-1234"
        id="phone"
        type="tel"
        className="mb-6 rounded-xl border border-[#cbd5e0] bg-[#f2f6f8] p-3 placeholder:text-[#768296]"
      />

      {/* Password */}
      <label
        htmlFor="password"
        className="mb-3 font-medium tracking-wide text-[#718096]"
      >
        Password
      </label>
      <input
        name="password"
        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        id="password"
        type="password"
        defaultValue="aA3#asdfg"
        className="mb-6 rounded-xl border border-[#cbd5e0] bg-[#f2f6f8] p-3 placeholder:text-[#768296]"
        required
      />
      <button
        type="submit"
        className="bg-rydio-green mb-12 cursor-pointer rounded-[1.25rem] px-10 py-5 text-xl font-semibold text-white"
      >
        {isPending ? <i>Creating your account...</i> : 'Create Account'}
      </button>
      <hr className="my-9 h-1.25 overflow-visible border-t border-[#4a5568] text-center text-[#4a5568] after:relative after:-top-3.5 after:bg-white after:px-4 after:text-xs after:content-['OR']" />
      <ContinueWithGoogle />
    </form>
  );
}
