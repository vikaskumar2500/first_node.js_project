import { useState } from "react";
import { EditForm } from "./edit-form";

export function ListItem({
  data,
  onUpdate,
}: {
  data: any;
  onUpdate: (id: string) => void;
}) {
  const [user, setUser] = useState<any>(data);
  const [isEditing, setIsEditing] = useState(false);

  const onDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/delete-user/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      onUpdate(id);
    } catch (e: any) {
      console.log(e.message);
    }
  };
  const onClose = () => setIsEditing(false);

  const onRetrieve = (data: any) => {
    setUser(data);
  };

  return (
    <>
      {!isEditing && (
        <li
          key={user.id}
          id={user.id}
          className="rounded-md flex items-center border px-10 py-2"
        >
          <div className="flex items-center gap-5">
            <p>
              {user.username}-{user.email}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="border rounded-md px-2"
              >
                edit
              </button>
              <button
                type="button"
                onClick={onDelete.bind(null, user.id)}
                className="border rounded-md px-2"
              >
                delete
              </button>
            </div>
          </div>
        </li>
      )}
      {isEditing && (
        <EditForm data={user} onClose={onClose} onRetrieve={onRetrieve} />
      )}
    </>
  );
}
