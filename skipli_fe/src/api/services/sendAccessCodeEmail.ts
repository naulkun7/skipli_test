import client from "../client";

export const sendAccessCodeEmail = async (email: string) => {
  const response = await client.post("sendAccessCodeViaEmail", {
    json: { email },
  });
  return response.json();
};
