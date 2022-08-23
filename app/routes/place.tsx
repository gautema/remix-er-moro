import { Outlet } from "@remix-run/react";

export default function Place() {
  return (
    <div className="flex flex-col max-w-3xl content-center mx-auto">
      <h1 className="text-3xl font-bold underline">Welcome to Remix</h1>
      <Outlet />
    </div>
  );
}
