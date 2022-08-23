import { ActionFunction, json, LoaderFunction } from "@remix-run/cloudflare";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
type Data = {
  name: String;
  favorite: boolean;
};

export const loader: LoaderFunction = async ({ params }) => {
  return json<Data>({
    name: params.place?.toLocaleUpperCase() || "",
    favorite: false,
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  return json<Data>({
    name: params.place?.toLocaleUpperCase() || "",
    favorite: true,
  });
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
