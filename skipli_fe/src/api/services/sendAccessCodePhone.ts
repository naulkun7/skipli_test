import client from "../client";

export const sendAccessCodePhone = async (phoneNumber: string) => {
  const response = await client.post("sendAccessCodeViaPhone", {
    json: { phoneNumber },
  });
  return response.json();
};
