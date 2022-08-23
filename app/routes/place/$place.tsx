import { ActionFunction, json, LoaderFunction } from "@remix-run/cloudflare";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { getSession, commitSession } from "~/session.server";

type Data = {
  name: String;
  favorite: boolean;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  let fav =
    params.place && session.has(params.place) && session.get(params.place);

  return json<Data>({
    name: params.place?.toLocaleUpperCase() || "",
    favorite: fav,
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  console.log(request.headers.get("Cookie"));
  const session = await getSession(request.headers.get("Cookie"));
  let fav = (params.place &&
    session.has(params.place) &&
    session.get(params.place)) as boolean;

  if (params.place) {
    session.set(params.place, !fav);
  }

  return json<Data>(
    {
      name: params.place?.toLocaleUpperCase() || "",
      favorite: !fav,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export default function Place() {
  const data = useLoaderData<Data>();
  const actionData = useActionData<Data>();
  const transition = useTransition();

  return (
    <div>
      {data.name}
      {actionData && actionData.favorite && <>Fav</>}
      {!actionData && data.favorite && <>Fav</>}
      {actionData && !actionData.favorite && <>Not fav</>}
      {!actionData && !data.favorite && <>Not fav</>}
      {transition.state === "idle" && (
        <Form method="post">
          <button
            type="submit"
            className="border-2 rounded-md border-green-600"
          >
            Set favorite
          </button>
        </Form>
      )}
      {transition.state === "loading" && <>Loading</>}
      {transition.state === "submitting" && <>Submitting</>}
    </div>
  );
}
