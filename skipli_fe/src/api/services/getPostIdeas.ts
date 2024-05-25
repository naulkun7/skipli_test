import client from "../client";

export const getPostIdeas = async (topic: string) => {
  const response = await client.post("getPostIdeas", {
    json: { topic },
  });
  return response.json();
};
