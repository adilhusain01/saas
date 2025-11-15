# NextAuth.js Getting Started Documentation

This Markdown file compiles the key sections from the official NextAuth.js "Getting Started" documentation. It is structured for easy parsing and feeding into an LLM. The content is sourced directly from the official site and preserved in its original form where possible, with sections combined hierarchically.

## Table of Contents
- [Introduction](#introduction)
- [Getting Started with Example](#getting-started-with-example)
- [Client API](#client-api)
- [REST API](#rest-api)
- [TypeScript](#typescript)

## Introduction {#introduction}

### About NextAuth.js

NextAuth.js is a complete open-source authentication solution for [Next.js](http://nextjs.org/) applications.

It is designed from the ground up to support Next.js and Serverless.

[Check out the example code](/getting-started/example) to see how easy it is to use NextAuth.js for authentication.

#### Own your own data

NextAuth.js can be used with or without a database.

* An open-source solution that allows you to keep control of your data
* Supports Bring Your Own Database (BYOD) and can be used with any database
* Built-in support for [MySQL, MariaDB, Postgres, SQL Server, MongoDB and SQLite](/configuration/databases)
* Works great with databases from popular hosting providers
* Can also be used without a database (e.g. OAuth + JWT)

Note: Email sign-in requires a database to be configured to store single-use verification tokens.

#### Secure by default

* Promotes the use of passwordless sign-in mechanisms
* Designed to be secure by default and encourage best practices for safeguarding user data
* Uses Cross-Site Request Forgery Tokens on POST routes (sign in, sign out)
* Default cookie policy aims for the most restrictive policy appropriate for each cookie
* When JSON Web Tokens are enabled, they are encrypted by default (JWE) with A256GCM
* Auto-generates symmetric signing and encryption keys for developer convenience
* Features tab/window syncing and keepalive messages to support short-lived sessions
* Attempts to implement the latest guidance published by [Open Web Application Security Project](https://owasp.org/)

Advanced options allow you to define your own routines to handle controlling what accounts are allowed to sign in, for encoding and decoding JSON Web Tokens and to set custom cookie security policies and session properties, so you can control who can sign in and how often sessions have to be re-validated.

### Credits

NextAuth.js is now owned and maintained by [Better Auth Inc.](https://better-auth.com) The project continues to be open source and is only possible [thanks to contributors](/contributors).

### Getting Started

[Check out the example code](/getting-started/example) to see how easy it is to use NextAuth.js for authentication.

---

## Getting Started with Example {#getting-started-with-example}

The example code below describes how to add authentication to a Next.js app.

### New Project

The easiest way to get started is to clone the [example app](https://github.com/nextauthjs/next-auth-example) and follow the instructions in README.md. You can try out a live demo at [https://next-auth-example.vercel.app/](https://next-auth-example.vercel.app/)

### Existing Project

#### Install NextAuth

```
npm install next-auth
```

> **info**  
> If you are using TypeScript, NextAuth.js comes with its types definitions within the package. To learn more about TypeScript for `next-auth`, check out the [TypeScript documentation](/getting-started/typescript)

#### Add API route

To add NextAuth.js to a project create a file called `[...nextauth].js` in `pages/api/auth`. This contains the dynamic route handler for NextAuth.js which will also contain all of your global NextAuth.js configurations.

If you're using [Next.js 13.2](https://nextjs.org/blog/next-13-2#custom-route-handlers) or above with the new App Router ( `app/`), you can initialize the configuration using the new [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/router-handlers) by following our [guide](https://next-auth.js.org/configuration/initialization#route-handlers-app).

**pages/api/auth/[...nextauth].js**

```js
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
```

All requests to `/api/auth/*` ( `signIn`, `callback`, `signOut`, etc.) will automatically be handled by NextAuth.js.

**Further Reading**:
* See the [options documentation](/configuration/options) for more details on how to configure providers, databases and other options.
* Read more about how to add authentication providers [here](/providers).

##### Configure Shared session state

To be able to use `useSession` first you'll need to expose the session context, [<SessionProvider />](/getting-started/client#sessionprovider), at the top level of your application:

**pages/_app.jsx**

```jsx
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```

Instances of `useSession` will then have access to the session data and status. The `<SessionProvider />` also takes care of keeping the session updated and synced between browser tabs and windows.

> **tip**  
> Check out the [client documentation](/getting-started/client) to see how you can improve the user experience and page performance by using the NextAuth.js client. If you are using the Next.js App Router, please note that `<SessionProvider />` requires a client component and therefore cannot be put inside the root layout. For more details, check out the [Next.js documentation](https://nextjs.org/docs/app/getting-started/layouts-and-pages).

#### Frontend - Add React Hook

The [useSession()](/getting-started/client#usesession) React Hook in the NextAuth.js client is the easiest way to check if someone is signed in.

**components/login-btn.jsx**

```jsx
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
```

You can use the `useSession` hook from anywhere in your application (e.g. in a header component).

#### Backend - API Route

To protect an API Route, you can use the [getServerSession()](/configuration/nextjs#unstable_getserversession) method.

**pages/api/restricted.js**

```js
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    })
  }
}
```

#### Extensibility

##### Using NextAuth.js Callbacks

NextAuth.js allows you to hook into various parts of the authentication flow via our [built-in callbacks](/configuration/callbacks).

For example, to pass a value from the sign-in to the frontend, client-side, you can use a combination of the [session](/configuration/callbacks#session-callback) and [jwt](/configuration/callbacks#jwt-callback) callback like so:

**pages/api/auth/[...nextauth].js**

```js
...
callbacks: {
  async jwt({ token, account }) {
    // Persist the OAuth access_token to the token right after signin
    if (account) {
      token.accessToken = account.access_token
    }
    return token
  },
  async session({ session, token, user }) {
    // Send properties to the client, like an access_token from a provider.
    session.accessToken = token.accessToken
    return session
  }
}
...
```

Now whenever you call [getSession](/getting-started/client#getsession) or [useSession](/getting-started/client#usesession), the data object which is returned will include the `accessToken` value.

**components/accessToken.jsx**

```jsx
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data } = useSession()
  const { accessToken } = data

  return <div>Access Token: {accessToken}</div>
}
```

### Configuring callback URL (OAuth only)

If you are using an OAuth provider either through one of our [built-in providers](/configuration/providers/oauth) or through a [custom provider](/configuration/providers/oauth#using-a-custom-provider), you'll need to configure a callback URL in your provider's settings. Each provider has a "Configuration" section that should give you pointers on how to do that.

Follow [these steps](/configuration/providers/oauth#how-to) to learn how to integrate with an OAuth provider.

### Deploying to production

When deploying your site set the `NEXTAUTH_URL` environment variable to the canonical URL of the website.

```
NEXTAUTH_URL=https://example.com
```

> **tip**  
> In production, this needs to be set as an environment variable on the service you use to deploy your app.  
> To set environment variables on Vercel, you can use the [dashboard](https://vercel.com/dashboard) or the `vercel env pull` [command](https://vercel.com/docs/build-step#development-environment-variables).  
> For more information please check out our [deployment page](/deployment).

---

## Client API {#client-api}

The NextAuth.js client library makes it easy to interact with sessions from React applications.

### Example Session Object

```json
{
  "user": {
    "name": "string",
    "email": "string",
    "image": "string"
  },
  "expires": "Date"
}
```

> **Tip**: The session data returned to the client does not contain sensitive information such as the Session Token or OAuth tokens. It contains a minimal payload that includes enough data needed to display information on a page about the user who is signed in for presentation purposes (e.g name, email, image).  
> 
> You can use the [session callback](/configuration/callbacks#session-callback) to customize the session object returned to the client if you need to return additional data in the session object.  
> 
> **Note**: The `expires` value is rotated, meaning whenever the session is retrieved from the [REST API](/getting-started/rest-api), this value will be updated as well, to avoid session expiry.

### useSession()

* **Client Side**: Yes  
* **Server Side**: No

The `useSession()` React Hook in the NextAuth.js client is the easiest way to check if someone is signed in.

Make sure that [<SessionProvider>](#sessionprovider) is added to `pages/_app.js`.

#### Example

```jsx
import { useSession } from "next-auth/react"

export default function Component() {
  const { data: session, status } = useSession()
  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>
  }
  return <a href="/api/auth/signin">Sign in</a>
}
```

`useSession()` returns an object containing two values: `data` and `status`:

* `data`: This can be three values: [Session](https://github.com/nextauthjs/next-auth/blob/8ff4b260143458c5d8a16b80b11d1b93baa0690f/types/index.d.ts#L437-L444) / `undefined` / `null`.
  * when the session hasn't been fetched yet, `data` will be `undefined`
  * in case it failed to retrieve the session, `data` will be `null`
  * in case of success, `data` will be [Session](https://github.com/nextauthjs/next-auth/blob/8ff4b260143458c5d8a16b80b11d1b93baa0690f/types/index.d.ts#L437-L444).
* `status`: enum mapping to three possible session states: `"loading" | "authenticated" | "unauthenticated"`

#### Require session

Due to the way Next.js handles `getServerSideProps` and `getInitialProps`, every protected page load has to make a server-side request to check if the session is valid and then generate the requested page (SSR). This increases server load, and if you are good with making the requests from the client, there is an alternative. You can use `useSession` in a way that makes sure you always have a valid session. If after the initial loading state there was no session found, you can define the appropriate action to respond.

The default behavior is to redirect the user to the sign-in page, from where - after a successful login - they will be sent back to the page they started on. You can also define an `onUnauthenticated()` callback, if you would like to do something else:

##### Example

**pages/protected.jsx**

```jsx
import { useSession } from "next-auth/react"

export default function Admin() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  })

  if (status === "loading") {
    return "Loading or not authenticated..."
  }

  return "User is logged in"
}
```

#### Custom Client Session Handling

Due to the way Next.js handles `getServerSideProps` / `getInitialProps`, every protected page load has to make a server-side request to check if the session is valid and then generate the requested page. This alternative solution allows for showing a loading state on the initial check and every page transition afterward will be client-side, without having to check with the server and regenerate pages.

**pages/admin.jsx**

```jsx
export default function AdminDashboard() {
  const { data: session } = useSession()
  // session is always non-null inside this page, all the way down the React tree.
  return "Some super secret dashboard"
}
AdminDashboard.auth = true
```

**pages/_app.jsx**

```jsx
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })
  if (status === "loading") {
    return <div>Loading...</div>
  }
  return children
}
```

It can be easily extended/modified to support something like an options object for role based authentication on pages. An example:

**pages/admin.jsx**

```jsx
AdminDashboard.auth = {
  role: "admin",
  loading: <AdminLoadingSkeleton />,
  unauthorized: "/login-with-different-user", // redirect to this url
}
```

Because of how `_app` is written, it won't unnecessarily contact the `/api/auth/session` endpoint for pages that do not require authentication.

More information can be found in the following [GitHub Issue](https://github.com/nextauthjs/next-auth/issues/1210).

#### Updating the session

The `useSession()` hook exposes a `update(data?: any): Promise<Session | null>` method that can be used to update the session, without reloading the page.

You can optionally pass an arbitrary object as the first argument, which will be accessible on the server to merge with the session object.

If you are not passing any argument, the session will be reloaded from the server. (This is useful if you want to update the session after a server-side mutation, like updating in the database.)

> **Caution**: The data object is coming from the client, so it needs to be validated on the server before saving.

##### Example

**pages/profile.tsx**

```jsx
import { useSession } from "next-auth/react"

export default function Page() {
  const { data: session, status, update } = useSession()
  if (status === "authenticated") {
    return (
      <>
        <p>Signed in as {session.user.name}</p>
        {/* Update the value by sending it to the backend. */}
        <button onClick={() => update({ name: "John Doe" })}>
          Edit name
        </button>
        {/*
         * Only trigger a session update, assuming you already updated the value server-side.
         * All `useSession().data` references will be updated.
         */}
        <button onClick={() => update()}>Edit name</button>
      </>
    )
  }
  return <a href="/api/auth/signin">Sign in</a>
}
```

Assuming a `strategy: "jwt"` is used, the `update()` method will trigger a `jwt` callback with the `trigger: "update"` option. You can use this to update the session object on the server.

**pages/api/auth/[...nextauth].ts**

```ts
...
export default NextAuth({
  ...
  callbacks: {
    // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
    jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name
      }
      return token
    }
  }
})
```

Assuming a `strategy: "database"` is used, the `update()` method will trigger the `session` callback with the `trigger: "update"` option. You can use this to update the session object on the server.

**pages/api/auth/[...nextauth].ts**

```ts
...
const adapter = PrismaAdapter(prisma)
export default NextAuth({
  ...adapter,
  callbacks: {
    // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
    async session({ session, trigger, newSession }) {
      // Note, that `rest.session` can be any arbitrary object, remember to validate it!
      if (trigger === "update" && newSession?.name) {
        // You can update the session in the database if it's not already updated.
        // await adapter.updateUser(session.user.id, { name: newSession.name })
        // Make sure the updated value is reflected on the client
        session.name = newSession.name
      }
      return session
    }
  }
})
```

#### Refetching the session

[SessionProvider#refetchInterval](#refetch-interval) and [SessionProvider#refetchOnWindowFocus](#refetch-on-window-focus) can be replaced with the `update()` method too.

> **Note**: The `update()` method won't sync between tabs as the `refetchInterval` and `refetchOnWindowFocus` options do.

**pages/profile.tsx**

```jsx
import { useEffect } from "react"
import { useSession } from "next-auth/react"

export default function Page() {
  const { data: session, status, update } = useSession()
  // Polling the session every 1 hour
  useEffect(() => {
    // TIP: You can also use `navigator.onLine` and some extra event handlers
    // to check if the user is online and only update the session if they are.
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
    const interval = setInterval(() => update(), 1000 * 60 * 60)
    return () => clearInterval(interval)
  }, [update])
  // Listen for when the page is visible, if the user switches tabs
  // and makes our tab visible again, re-fetch the session
  useEffect(() => {
    const visibilityHandler = () =>
      document.visibilityState === "visible" && update()
    window.addEventListener("visibilitychange", visibilityHandler, false)
    return () =>
      window.removeEventListener("visibilitychange", visibilityHandler, false)
  }, [update])
  return <pre>{JSON.stringify(session, null, 2)}</pre>
}
```

### getSession()

NextAuth.js provides a `getSession()` helper which should be called client side only to return the current active session.

On the server side, this is still available to use, however, we recommend using `getServerSession` going forward. The idea behind this is to avoid an additional unnecessary `fetch` call on the server side. For more information, please check out [this issue](https://github.com/nextauthjs/next-auth/issues/1535).

This helper is helpful in case you want to read the session outside of the context of React.

When called, `getSession()` will send a request to `/api/auth/session` and returns a promise with a [session object](https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/core/types.ts#L407-L425), or `null` if no session exists.

```js
async function myFunction() {
  const session = await getSession()
  /* ... */
}
```

Read the tutorial [securing pages and API routes](/tutorials/securing-pages-and-api-routes) to know how to fetch the session in server side calls using `getServerSession()`.

### getCsrfToken()

* **Client Side**: Yes  
* **Server Side**: Yes

The `getCsrfToken()` method returns the current Cross Site Request Forgery Token (CSRF Token) required to make POST requests (e.g. for signing in and signing out).

You likely only need to use this if you are not using the built-in `signIn()` and `signOut()` methods.

#### Client Side Example

```js
async function myFunction() {
  const csrfToken = await getCsrfToken()
  /* ... */
}
```

#### Server Side Example

```js
import { getCsrfToken } from "next-auth/react"

export default async (req, res) => {
  const csrfToken = await getCsrfToken({ req })
  /* ... */
  res.end()
}
```

### getProviders()

* **Client Side**: Yes  
* **Server Side**: Yes

The `getProviders()` method returns the list of providers currently configured for sign in.

It calls `/api/auth/providers` and returns a list of the currently configured authentication providers.

It can be useful if you are creating a dynamic custom sign in page.

#### API Route

**pages/api/example.js**

```js
import { getProviders } from "next-auth/react"

export default async (req, res) => {
  const providers = await getProviders()
  console.log("Providers", providers)
  res.end()
}
```

> **Note**: Unlike `getCsrfToken()`, when calling `getProviders()` server side, you don't need to pass anything, just as calling it client side.

### signIn()

* **Client Side**: Yes  
* **Server Side**: No

Using the `signIn()` method ensures the user ends back on the page they started on after completing a sign in flow. It will also handle CSRF Tokens for you automatically when signing in with email.

The `signIn()` method can be called from the client in different ways, as shown below.

#### Redirects to sign in page when clicked

```jsx
import { signIn } from "next-auth/react"

export default () => <button onClick={() => signIn()}>Sign in</button>
```

#### Starts OAuth sign-in flow when clicked

By default, when calling the `signIn()` method with no arguments, you will be redirected to the NextAuth.js sign-in page. If you want to sign in with a specific provider, you can pass the provider id to the method as a string, or as an options object with a `provider` property.

```jsx
import { signIn } from "next-auth/react"

export default function SignInButton() {
  return (
    <button onClick={() => signIn("github")}>
      Sign in with GitHub
    </button>
  )
}
```

You can also pass additional options to the `signIn()` method to customize the sign in flow.

```jsx
import { signIn } from "next-auth/react"

export default function SignIn() {
  return (
    <button
      onClick={() =>
        signIn("github", { callbackUrl: "https://example.com/api/custom" })
      }
    >
      Sign in with GitHub
    </button>
  )
}
```

The available options are:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `callbackUrl` | `string` | `/` | The URL to redirect to after sign in. If not provided, the default callback URL is used. |
| `error` | `string` | `""` | The error to display on the sign in page. |
| `redirect` | `boolean` | `true` | Whether to redirect after sign in. If `false`, the sign in flow will be handled without redirecting. |

> **Note**: The `redirect` option is only available when using the `signIn()` method with OAuth providers. It is not supported for email or credentials providers.

### signOut()

* **Client Side**: Yes  
* **Server Side**: No

The `signOut()` method can be used to sign the user out.

```jsx
import { signOut } from "next-auth/react"

export default function Component() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })}>
      Sign out
    </button>
  )
}
```

The available options are:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `callbackUrl` | `string` | `/` | The URL to redirect to after sign out. If not provided, the default callback URL is used. |
| `redirect` | `boolean` | `true` | Whether to redirect after sign out. If `false`, the sign out flow will be handled without redirecting. |

> **Note**: The `redirect` option is only available when using the `signOut()` method with JWT sessions. It is not supported for database sessions.

### SessionProvider

The `<SessionProvider>` component makes the session data available to all child components in the React component tree.

```jsx
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
```

The `<SessionProvider>` accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `session` | `Session \| null` | `null` | The initial session data. If not provided, the session will be fetched from the server. |
| `refetchInterval` | `number` | `0` | The interval in milliseconds to refetch the session. If `0`, the session will not be refetched automatically. |
| `refetchOnWindowFocus` | `boolean` | `false` | Whether to refetch the session when the window gains focus. |
| `children` | `React.ReactNode` | - | The child components. |

#### refetchInterval

The `refetchInterval` prop can be used to automatically refetch the session at a specified interval.

```jsx
<SessionProvider
  session={session}
  refetchInterval={5 * 60} // Refetch every 5 minutes
>
  <Component />
</SessionProvider>
```

#### refetchOnWindowFocus

The `refetchOnWindowFocus` prop can be used to refetch the session when the window gains focus.

```jsx
<SessionProvider
  session={session}
  refetchOnWindowFocus={true}
>
  <Component />
</SessionProvider>
```

---

## REST API {#rest-api}

NextAuth.js exposes a REST API that is used by the NextAuth.js client.

### `GET` /api/auth/signin

Displays the built-in/unbranded sign-in page.

### `POST` /api/auth/signin/:provider

Starts a provider-specific sign-in flow.

The POST submission requires CSRF token from `/api/auth/csrf`.

In case of an OAuth provider, calling this endpoint will initiate the Authorization Request to your Identity Provider. Learn more about this in the [OAuth specification](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1).

In case of using the Email provider, calling this endpoint will send a sign-in URL to the user's e-mail address.

This endpoint is also used by the [signIn](/getting-started/client#signin) method internally.

### `GET` / `POST` /api/auth/callback/:provider

Handles returning requests from OAuth services during sign-in.

For OAuth 2.0 providers that support the `checks: ["state"]` option, the state parameter is checked against the one that was generated when the sign in flow was started - this uses a hash of the CSRF token which MUST match for both the `POST` and `GET` calls during sign-in.

Learn more about this in the [OAuth specification](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2).

### `GET` /api/auth/signout

Displays the built-in/unbranded sign out page.

### `POST` /api/auth/signout

Handles signing the user out - this is a `POST` submission to prevent malicious links from triggering signing a user out without their consent. The user session will be invalidated/removed from the cookie/database, depending on the flow you chose to [store sessions](/configuration/options#session).

The `POST` submission requires CSRF token from `/api/auth/csrf`.

This endpoint is also used by the [signOut](/getting-started/client#signout) method internally.

### `GET` /api/auth/session

Returns client-safe session object - or an empty object if there is no session.

The contents of the session object that is returned are configurable with the [session callback](/configuration/callbacks#session-callback).

### `GET` /api/auth/csrf

Returns object containing CSRF token. In NextAuth.js, CSRF protection is present on all authentication routes. It uses the "double submit cookie method", which uses a signed HttpOnly, host-only cookie.

The CSRF token returned by this endpoint must be passed as form variable named `csrfToken` in all `POST` submissions to any API endpoint.

### `GET` /api/auth/providers

Returns a list of configured OAuth services and details (e.g. sign in and callback URLs) for each service.

It is useful to dynamically generate custom sign up pages and to check what callback URLs are configured for each OAuth provider that is configured.

> **note**  
> The default base path is `/api/auth` but it is configurable by specifying a custom path in `NEXTAUTH_URL`  
> 
> e.g.  
> 
> `NEXTAUTH_URL=https://example.com/myapp/api/authentication`  
> 
> `/api/auth/signin` -> `/myapp/api/authentication/signin`

---

## TypeScript {#typescript}

### TypeScript

NextAuth.js has its own type definitions to use in your TypeScript projects safely. Even if you don't use TypeScript, IDEs like VSCode will pick this up to provide you with a better developer experience. While you are typing, you will get suggestions about what certain objects/functions look like, and sometimes links to documentation, examples, and other valuable resources.

Check out the example repository showcasing how to use `next-auth` on a Next.js application with TypeScript:

[https://github.com/nextauthjs/next-auth-example](https://github.com/nextauthjs/next-auth-example)

### Adapters

If you're writing your own custom Adapter, you can take advantage of the types to make sure your implementation conforms to what's expected:

```ts
import type { Adapter } from "next-auth/adapters"

function MyAdapter(): Adapter {
  return {
    // your adapter methods here
  }
}
```

When writing your own custom Adapter in plain JavaScript, note that you can use JSDoc to get helpful editor hints and auto-completion like so:

```js
/**
 * @return { import("next-auth/adapters").Adapter }
 */
function MyAdapter() {
  return {
    // your adapter methods here
  }
}
```

> **Note**: This will work in code editors with a strong TypeScript integration like VSCode or WebStorm. It might not work if you're using more lightweight editors like VIM or Atom.

### Module Augmentation

`next-auth` comes with certain types/interfaces that are shared across submodules. Good examples are `Session` and `JWT`. Ideally, you should only need to create these types at a single place, and TS should pick them up in every location where they are referenced. Luckily, Module Augmentation is exactly that, which can do this for us. Define your shared interfaces in a single place, and get type-safety across your application when using `next-auth` (or one of its submodules).

#### Main module

Let's look at `Session`:

**pages/api/auth/[...nextauth].ts**

```ts
import NextAuth from "next-auth"

export default NextAuth({
  callbacks: {
    session({ session, token, user }) {
      return session // The return type will match the one returned in `useSession()`
    },
  },
})
```

**pages/index.ts**

```ts
import { useSession } from "next-auth/react"

export default function IndexPage() {
  // `session` will match the returned value of `callbacks.session()` from `NextAuth()`
  const { data: session } = useSession()
  return (
    // Your component
  )
}
```

To extend/augment this type, create a `types/next-auth.d.ts` file in your project:

**types/next-auth.d.ts**

```ts
import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string
    }
  }
}
```

##### Extend default interface properties

By default, TypeScript will merge new interface properties and overwrite existing ones. In this case, the default session user properties will be overwritten, with the new one defined above.

If you want to keep the default session user properties, you need to add them back into the newly declared interface:

**types/next-auth.d.ts**

```ts
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string
    } & DefaultSession["user"]
  }
}
```

Although you can augment almost anything, here are some of the more common interfaces that you might want to override in the `next-auth` module:

```ts
/**
 * The shape of the user object returned in the OAuth providers' `profile` callback,
 * or the second parameter of the `session` callback, when using a database.
 */
interface User {}

/**
 * Usually contains information about the provider being used
 * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
 */
interface Account {}

/** The OAuth profile returned from your provider */
interface Profile {}
```

Make sure that the `types` folder is added to [typeRoots](https://www.typescriptlang.org/tsconfig/#typeRoots) in your project's `tsconfig.json` file.

#### Submodules

The `JWT` interface can be found in the `next-auth/jwt` submodule:

**types/next-auth.d.ts**

```ts
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  /**
   * Returned by the `jwt` callback and `getToken`, when using JWT sessions
   */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string
  }
}
```

- [TypeScript documentation: Module Augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)
- [Digital Ocean: Module Augmentation in TypeScript](https://www.digitalocean.com/community/tutorials/typescript-module-augmentation)

### Contributing

Contributions of any kind are always welcome, especially for TypeScript. Please keep in mind that we are a small team working on this project in our free time. We will try our best to give support, but if you think you have a solution for a problem, please open a PR!

> **Note**: When contributing to TypeScript, if the actual JavaScript user API does not change in a breaking manner, we reserve the right to push any TypeScript change in a minor release. This ensures that we can keep on a faster release cycle.

---

This document covers the core "Getting Started" sections. For deeper topics like providers, databases, or advanced configuration, refer to the full official documentation at [https://next-auth.js.org/](https://next-auth.js.org/).

## Key Citations
- [Introduction | NextAuth.js](https://next-auth.js.org/getting-started/introduction)
- [Getting Started | NextAuth.js](https://next-auth.js.org/getting-started/example)
- [Client API | NextAuth.js](https://next-auth.js.org/getting-started/client)
- [REST API | NextAuth.js](https://next-auth.js.org/getting-started/rest-api)
- [TypeScript | NextAuth.js](https://next-auth.js.org/getting-started/typescript)