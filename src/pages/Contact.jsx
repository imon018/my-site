export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold">
        Contact Us
      </h1>

      <form className="mt-8 space-y-4">

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Your Name"
        />

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Email"
        />

        <textarea
          className="w-full border rounded-lg p-3"
          rows="5"
          placeholder="Message"
        />

        <button className="bg-primary text-white px-6 py-3 rounded-lg">
          Send Message
        </button>

      </form>

    </div>
  );
}
