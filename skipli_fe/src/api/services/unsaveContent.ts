import client from "../client";

export const unsaveContent = async (captionId: string) => {
  const response = await client.post("unSaveContent", {
    json: { captionId },
  });
  return response.json();
};
