import {
  ElementRef,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { List } from "./list";

export const Form = () => {
  const [users, setUsers] = useState<any>([]);

  const forRef = useRef<ElementRef<"form">>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000");
      if (!res.ok) throw new Error("failed to fetch data");

      const data = (await res.json()) as any;
      console.log(data);
      setUsers(data);
    } catch (e) {
      console.log(e);
      setUsers([]);
    }
  }, [users]);
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    "use server";
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    try {
      await fetch("http://localhost:3000/add-user", {
        method: "POST",
        body: JSON.stringify({ password, username, email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      forRef.current?.reset();
      fetchData();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <section className="flex items-center w-full flex-col p-10 gap-10">
      <form
        noValidate
        ref={forRef}
        onSubmit={handleSubmit}
        className="border max-w-xl w-full p-10 gap-5 flex flex-col rounded-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-700">
          BOOKING APPOINTMENT APP
        </h2>

        <div className=" flex flex-col items-start gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="border w-full rounded-md py-1 px-2"
            name="username"
            id="username"
          />
        </div>
        <div className=" flex flex-col items-start gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="border w-full rounded-md py-1 px-2"
            name="password"
            id="password"
          />
        </div>
        <div className=" flex flex-col items-start gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="border w-full rounded-md py-1 px-2"
            name="email"
            id="email"
          />
        </div>
        <button
          type="submit"
          className="border py-1 px-3 rounded-md text-center bg-blue-50 mt-3 hover:bg-blue-100"
        >
          Submit
        </button>
      </form>
      <List data={users} />
    </section>
  );
};
