import {
  createCookie,
  createCloudflareKVSessionStorage,
} from "@remix-run/cloudflare";

// In this example the Cookie is created separately.
const sessionCookie = createCookie("__session", {
  secrets: ["l;dkfs$55fdfllo"],
  sameSite: true,
});

const { getSession, commitSession, destroySession } =
  createCloudflareKVSessionStorage({
    // The KV Namespace where you want to store sessions
    kv: KV_SESSION,
    cookie: sessionCookie,
  });

export { getSession, commitSession, destroySession };
