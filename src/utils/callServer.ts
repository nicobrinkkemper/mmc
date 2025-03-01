import {
  createFromFetch,
  encodeReply,
} from "react-server-dom-esm/client.browser";
import { BASE_URL_WITH_PUBLIC_URL } from "../config/env.js";

type ServerResponse = { returnValue: unknown };
console.log(BASE_URL_WITH_PUBLIC_URL);
export const callServer = async (
  id: string,
  args: unknown[]
): Promise<unknown> => {
  console.log("Fetching", id);
  const response = await createFromFetch(
    fetch(BASE_URL_WITH_PUBLIC_URL, {
      method: "POST",
      body: await encodeReply(args),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }),
    { callServer, moduleBaseURL: BASE_URL_WITH_PUBLIC_URL }
  );
  const returnValue = (response as ServerResponse).returnValue;
  return returnValue;
};
