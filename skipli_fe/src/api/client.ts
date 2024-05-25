import ky from "ky";

const client = ky.create({
  prefixUrl: "http://localhost:4000/api",
  hooks: {
    beforeRequest: [
      async (request) => {
        console.log("Requesting", request.url);
      },
    ],
    afterResponse: [
      async (response) => {
        console.log("Response", response.url);
      },
    ],
  },
});

export default client;
