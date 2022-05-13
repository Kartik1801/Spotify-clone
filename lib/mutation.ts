import fetcher from "./fetcher";

export const auth = (
  mode: "signup" | "signin",
  body: {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
  }
) => {
  return fetcher(`/${mode}`, body);
};
