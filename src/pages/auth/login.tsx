import { getCsrfToken } from "next-auth/react";

export default function SignIn({ csrfToken }) {
  return (
    <form action="/api/auth/signin/email" method="post">
      <input defaultValue={csrfToken} name="csrfToken" type="hidden" />
      <label>
        Email address
        <input id="email" name="email" type="email" />
      </label>
      <button type="submit">Sign in with Email</button>
    </form>
  );
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
