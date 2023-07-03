import { fetchTeams } from "../services/games/teams";
import { JSX, Show, createResource } from "solid-js";

export default function Games(): JSX.Element {
  const [teams] = createResource(fetchTeams);

  return (
    <article class="prose w-full">
      <h2>Games</h2>
      <Show when={teams.loading}>Loading...</Show>
      <Show when={teams.error}>Error: {teams.error.message}</Show>
      <Show when={teams()}>
        <ul>
          {teams()?.rows.map((team) => (
            <li>{team.name}</li>
          ))}
        </ul>
      </Show>
    </article>
  );
}
