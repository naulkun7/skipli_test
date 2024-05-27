import client from "../client";

type GetUserGeneratedContentsParams = {
  userIdentifier: string;
};

export const getUserGeneratedContents = async ({
  userIdentifier,
}: GetUserGeneratedContentsParams) => {
  const response = await client.get("getUserGeneratedContents", {
    searchParams: { userIdentifier },
  });

  return response.json();
};
