import { ActionFunction, json } from "@remix-run/cloudflare";
import { commitSession, getSession } from "~/session.server";

type Data = {
  name: string;
  favorite: boolean;
};

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const name = formData.get("name")?.toString() || "";

  let fav =
    (name && session.has(name) && (session.get(name) as boolean)) || false;
  if (name) {
    session.set(name, !fav);
  }

  return json<Data>(
    {
      name: name?.toLocaleUpperCase() || "",
      favorite: !fav,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};
