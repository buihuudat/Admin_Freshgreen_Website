import { ChangeEvent } from "react";
import { NotificationToast } from "./NotificationToast";

export interface DataType {
  data: string | undefined | ArrayBuffer;
}

export const getBaseImage = async (e: ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;
  const files = Array.from(e.target.files);

  const data: DataType[] = [];

  for (const file of files) {
    if (file.type.startsWith("image/")) {
      const result = await readFile(file);
      data.push(result);
    } else {
      NotificationToast({
        message: `File ${file.name} is not an image.`,
        type: "error",
      });
    }
  }

  return data;
};

const readFile = (file: File): Promise<DataType> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        const result: DataType = { data: reader.result };
        resolve(result);
      } else {
        reject(new Error("Failed to read file."));
      }
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsDataURL(file);
  });
};
