import client from "../client";

type GetUserGeneratedContentsParams = {
  phoneNumber?: string;
  email?: string;
};

export const getUserGeneratedContents = async ({
  phoneNumber,
  email,
}: GetUserGeneratedContentsParams) => {
  const searchParams = new URLSearchParams();

  if (phoneNumber) {
    searchParams.append("phone_number", phoneNumber);
  }

  if (email) {
    searchParams.append("email", email);
  }

  const response = await client.get("getUserGeneratedContents", {
    searchParams,
  });

  return response.json();
};
