import client from "../client";

type GeneratePostCaptionsParams = {
  socialNetwork: string;
  subject: string;
  tone: string;
};

export const generatePostCaptions = async ({
  socialNetwork,
  subject,
  tone,
}: GeneratePostCaptionsParams) => {
  const response = await client.post("generatePostCaptions", {
    json: { socialNetwork, subject, tone },
  });
  return response.json();
};
