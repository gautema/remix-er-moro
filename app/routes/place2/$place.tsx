import { json, LoaderFunction } from "@remix-run/cloudflare";
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { getSession } from "~/session.server";

type Data = {
  name: string;
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

export default function Place() {
  const data = useLoaderData<Data>();
  const actionData = useActionData<Data>();
  const fetcher = useFetcher();

  return (
    <div>
      {data.name}
      {actionData && actionData.favorite && <>Fav</>}
      {!actionData && data.favorite && <>Fav</>}
      {actionData && !actionData.favorite && <>Not fav</>}
      {!actionData && !data.favorite && <>Not fav</>}
      {fetcher.state === "idle" && (
        <fetcher.Form method="post" action="/api/set_fav">
          <input
            name="name"
            type="hidden"
            value={data.name.toLocaleLowerCase()}
          />
          <button
            type="submit"
            className="border-2 rounded-md border-green-600"
          >
            Set favorite
          </button>
        </fetcher.Form>
      )}
      {fetcher.state === "loading" && <>Loading</>}
      {fetcher.state === "submitting" && <>Submitting</>}
    </div>
  );
}
