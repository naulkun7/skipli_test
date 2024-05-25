import client from "../client";

type ValidateAccessCodeParams = {
  accessCode: string;
  phoneNumber?: string;
  email?: string;
};

export const validateAccessCode = async (data: ValidateAccessCodeParams) => {
  const response = await client.post("validateAccessCode", {
    json: data,
  });
  return response.json();
};
