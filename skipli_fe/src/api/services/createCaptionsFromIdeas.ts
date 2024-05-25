import client from "../client";

export const createCaptionsFromIdeas = async (idea: string) => {
  const response = await client.post("createCaptionsFromIdeas", {
    json: { idea },
  });
  return response.json();
};
