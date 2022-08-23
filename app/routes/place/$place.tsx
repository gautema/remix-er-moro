import { json, LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData, useParams } from "@remix-run/react";
type Data = {
  name: String;
};

export const loader: LoaderFunction = async ({ params }) => {
  return json<Data>({ name: params.place?.toLocaleUpperCase() || "" });
};

export default function Place() {
  const data = useLoaderData<Data>();
  return <div>{data.name}</div>;
}
