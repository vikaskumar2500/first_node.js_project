import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

export function List({ data }: { data: any[] }) {
  const [updatedData, setUpdatedData] = useState<any[]>(data);

  useEffect(() => {
    setUpdatedData(data);
  }, [data]);

  const onUpdateData = (id: string) => {
    const filteredData = updatedData.filter((data) => data.id !== id);
    setUpdatedData(filteredData);
  };

  return (
    <ul className="w-full flex flex-col gap-2 items-center">
      {updatedData.map((item: any, index) => (
        <ListItem key={index} data={item} onUpdate={onUpdateData} />
      ))}
    </ul>
  );
}
