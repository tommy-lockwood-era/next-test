import { create } from "./actions";

export default function Page() {
  return (
    <form action={create} className="m-4 text-2xl">
      <input
        type="text"
        placeholder="write a comment"
        name="comment"
        className="border border-gray-500 rounded-md mr-3 px-4 py-2"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white font-medium rounded-md border border-green-600"
      >
        Submit
      </button>
    </form>
  );
}
