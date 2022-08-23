import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="flex flex-col max-w-3xl content-center mx-auto">
      <h1 className="text-3xl font-bold underline">Welcome to Remix</h1>
      <Link to="/place/oslo" prefetch={"intent"}>
        <a>Oslo</a>
      </Link>
    </div>
  );
}
