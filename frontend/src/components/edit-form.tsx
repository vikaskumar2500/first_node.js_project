import { FormEvent, useState } from "react";

export const EditForm = ({
  data,
  onClose,
  onRetrieve,
}: {
  data: any;
  onClose: () => void;
  onRetrieve: (data: any) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username");
    const email = formData.get("email");
    console.log(username, email);
    try {
      setIsLoading(true);

      await fetch(`http://localhost:3000/edit-user/${data.id}`, {
        method: "POST",
        body: JSON.stringify({ username, email }),
        headers: { "Content-Type": "application/json" },
      });

      onRetrieve({ ...data, username, email });
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      method="post"
      className="flex items-start justify-between gap-5"
    >
      <input
        id="username"
        defaultValue={data?.username}
        className="border py-1 px-2 rounded-md"
        name="username"
        placeholder="Enter username"
      />
      <input
        id="email"
        defaultValue={data?.email}
        name="email"
        type="email"
        className="border py-1 px-2 rounded-md"
        placeholder="Enter email"
      />
      <div className="flex items-center justify-between gap-1">
        <button type="submit" className="border px-2 py-1 rounded-md">
          {isLoading ? "Savi..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="border px-2 py-1 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
