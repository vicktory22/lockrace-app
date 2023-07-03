import { useAuth } from "../providers/auth";
import { fromPromise } from "../services/result";
import { JSX } from "solid-js";

export default function Me(): JSX.Element {
  const auth = useAuth();

  async function handleClick() {
    const result = await fetchMe();

    if (result.isErr()) {
      console.log({ error: result.error });
      return;
    }

    console.log({ result: result.value });
  }

  return (
    <article class="prose lg:prose-xl">
      <h2>Profile</h2>
      <hr />
      <h4 class="underline">Email</h4>
      <p>{auth?.user?.primaryEmailAddress?.emailAddress}</p>
      <h4 class="underline">Display Name</h4>
      <p>{auth?.user?.fullName}</p>
      <button class="btn btn-sm btn-primary btn-block" onClick={handleClick}>
        Edit
      </button>
    </article>
  );
}

const fetchMe = async () =>
  fromPromise(
    fetch("http://localhost:8788/api/me", {
      credentials: "include",
    }).then((res) => res.json()),
  );
