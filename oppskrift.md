# La oss lage noe moro

## Lag et nytt prosjekt og deploy til cloudflare

```
npx create-remix@latest
```

```
? Where would you like to create your app? boitano-demo
? What type of app do you want to create? Just the basics
? Where do you want to deploy? Choose Remix App Server if you're unsure; it's easy to change deployment targets. Cloudflare Workers
? TypeScript or JavaScript? TypeScript
? Do you want me to run `npm install`? Yes
```

Installer Wrangler for å bruke med cloudflare workers

```
npm install -g wrangler
```

Velg ditt eget `name` i `wrangler.toml`. Dette er navnet appen din vil hete på Cloudflare

Deploy appen til cloudflare

```
npm run deploy
```

## La oss bruke Tailwind

Følg stegene på https://tailwindcss.com/docs/guides/remix

Fix `dev` i `package.json`

```
"dev": "concurrently \"npm run dev:css\" \"remix build && run-p \"dev:*\"\"",
```

Lek litt med fancy styling av ting og sjekk at det virker. Legg gjerne på noen globale regler.

## Lag noen routes få med Parametere

Lag filen `app\routes\place.tsx` og `app\routes\place\$place.tsx`
Få med Outlet og print ut navnet på stedet

Lag en link to place i index.tsx

```
<Link to="/place/oslo">
  <a>Oslo</a>
</Link>
```

Lag en loader-function

```
type Data = {
  name: String;
};

export const loader: LoaderFunction = async ({ params }) => {
  return json<Data>({ name: params.place?.toLocaleUpperCase() });
};
```

## Lag en form

```
export const action: ActionFunction = async ({ request, params }) => {
  return json<Data>({
    name: params.place?.toLocaleUpperCase() || "",
    favorite: true,
  });
};

const actionData = useActionData<Data>();
const transition = useTransition();

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

```

## Save data to KV

Masse kode

## Preload links

```
<Link to="/place/oslo" prefetch={"intent"}>
  <a>Oslo</a>
</Link>
```

## Legg til Meta tags

# Bonusoppgaver

## Error boundries

## Mer avansert form

## Optismistisk UI på form submit

## Hent data from yr.no eller lignende eksternt api.

## Hent data både i ui og serverside og sjekk forskjellene.

## Prøv ut Blues Stack og deploy til fly.io

## Bruk global redis på upstash.com

## Form validation with https://www.remix-validated-form.io/
