import { useState } from "react";

import {
  subscribeEmail,
} from "../services/newsletterService";

import {
  successToast,
  errorToast,
} from "./ui/Toast";

export default function NewsletterSection() {

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {

    if (!email.trim()) {

      errorToast("Enter your email.");

      return;

    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      errorToast("Enter a valid email.");

      return;

    }

    try {

      setLoading(true);

      await subscribeEmail(email);

      successToast(
        "Subscribed successfully!"
      );

      setEmail("");

    } catch (error) {

      errorToast(
        error.message
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="pb-20">

      <div className="container-box">

        <div
          className="
          relative
          overflow-hidden
          rounded-[40px]
          bg-gradient-to-r
          from-blue-950
          via-blue-900
          to-slate-900
          px-8
          py-12
          md:px-14
          md:py-16
          text-center
          text-white
          shadow-premium
          "
        >

          <div
            className="
            absolute
            -top-20
            -left-20
            w-60
            h-60
            rounded-full
            bg-yellow-400/20
            blur-[100px]
            "
          />

          <div
            className="
            absolute
            -bottom-20
            -right-20
            w-60
            h-60
            rounded-full
            bg-white/10
            blur-[100px]
            "
          />

          <div className="relative z-10">

            <h2
              className="
              text-3xl
              md:text-5xl
              font-black
              "
            >
              Stay Updated
            </h2>

            <p
              className="
              mt-4
              text-blue-100
              max-w-2xl
              mx-auto
              "
            >
              Subscribe to receive our latest
              collections, exclusive offers and
              premium fashion updates.
            </p>

            <div
              className="
              mt-8
              flex
              flex-col
              md:flex-row
              gap-4
              justify-center
              max-w-2xl
              mx-auto
              "
            >

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                flex-1
                rounded-2xl
                px-6
                py-4
                text-black
                outline-none
                "
              />

              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="
                rounded-2xl
                bg-yellow-500
                px-8
                py-4
                font-bold
                text-black
                transition
                hover:bg-yellow-400
                disabled:opacity-60
                "
              >

                {loading
                  ? "Subscribing..."
                  : "Subscribe"}

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}
