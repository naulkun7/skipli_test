import client from "../client";

interface GetPostIdeasResponse {
  ideas: string[];
}

export const getPostIdeas = async (params: {
  topic: string;
}): Promise<GetPostIdeasResponse> => {
  const response = await client.post("getPostIdeas", {
    json: params,
  });
  return response.json();
};
