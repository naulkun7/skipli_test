import client from "../client";

type SaveGeneratedContentRequest = {
  topic: string;
  data: string;
};

export const saveGeneratedContent = async ({
  topic,
  data,
}: SaveGeneratedContentRequest) => {
  const response = await client.post("saveGeneratedContent", {
    json: { topic, data },
  });
  return response.json();
};
