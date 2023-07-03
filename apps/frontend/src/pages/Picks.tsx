import { JSX, Show, createResource, For } from "solid-js";

export default function Games(): JSX.Element {
  const [competitions] = createResource(fetchCompetitions);

  return (
    <article class="prose w-full">
      <h2>Make a pick</h2>
      <Show when={competitions.loading}>Loading...</Show>
      <Show when={competitions.error}>Error: {competitions.error.message}</Show>
      <Show when={competitions()}>
        <For each={competitions()}>{(competition) =>
          <div class="prose">
            <h6>{competition.game_time}</h6>
            <div class="flex w-full">
              <div class="flex-1 grid h-14 flex-grow card bg-base-300 rounded-box place-items-center">{competition.away_team_name} ({competition.away_team_odds})</div>
              <div class="grid place-items-center px-2">@</div>
              <div class="flex-1 grid h-14 flex-grow card bg-base-300 rounded-box place-items-center">{competition.home_team_name} ({competition.home_team_odds})</div>
            </div>
            <div class="divider" />
          </div>
        }</For>
      </Show>
    </article>
  );
}

type Competition = {
  id: number;
  home_team_id: number;
  home_team_name: string;
  home_team_odds: number;
  away_team_id: number;
  away_team_name: string;
  away_team_odds: number;
  game_time: string;
  home_score: number;
  away_score: number;
}

const fetchCompetitions = async (): Promise<Competition[]> =>
  fetch("http://localhost:8788/api/picks", { credentials: "include" }).then((res) => res.json());
