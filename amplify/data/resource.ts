import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  PrivatePost: a
    .model({
      id: a.string().required(),
      voice: a.string().required(),
      text: a.string().required(),
      status: a.string().required(),
      url: a.string().required(),
      owner: a
        .string()
        .authorization((allow) => [allow.owner().to(["read", "delete"])]),
    })
    .authorization((allow) => [allow.owner()]),
  PublicPost: a
    .model({
      id: a.string().required(),
      voice: a.string().required(),
      text: a.string().required(),
      status: a.string().required(),
      url: a.string().required(),
    })
    .authorization((allow) => [
      allow.guest().to(["create", "read"]),
      allow.authenticated().to(["create", "read"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  // authorizationModes: {
  //   // This tells the data client in your app (generateClient())
  //   // to sign API requests with the user authentication token.
  //   // defaultAuthorizationMode: "userPool",
  //   // defaultAuthorizationMode: "identityPool",
  //   // defaultAuthorizationMode: 'iam',
  //   defaultAuthorizationMode: "apiKey",
  //   apiKeyAuthorizationMode: {
  //     expiresInDays: 30,
  //   }
  // },
});
