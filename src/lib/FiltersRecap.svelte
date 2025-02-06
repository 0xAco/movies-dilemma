<script lang="ts">
let filtersIcon: HTMLElement;
let filtersContent: HTMLElement;

interface Props {
	filters: Filterables;
}

const { filters }: Props = $props();
$state.snapshot(filters);

const yearGte = filters.primary_release_date_gte.gte;
const yearLte = filters.primary_release_date_gte.lte;
const voteCountGte = filters.vote_count_gte.gte;
const voteCountLte = filters.vote_count_gte.lte;
const voteAverageGte = filters.vote_average_gte.gte;
const voteAverageLte = filters.vote_average_gte.lte;
const filtersMap = new Map([
	['genres', filters.with_genres.map((g) => g.name)],
	['acteur·ice·s', filters.with_people],
	['année', [`${yearGte}`.slice(0, 4), `${yearLte}`.slice(0, 4)]],
	['score', [`${voteAverageGte}`, `${voteAverageLte}`]],
	['nombre de votes', [`${voteCountGte}`, `${voteCountLte}`]],
]);

for (const filter of filtersMap) {
	if (filter[1].every((v) => v === '')) filtersMap.delete(filter[0]);
}

console.log(filtersMap);

const handleRootEnter = () => {
	filtersContent.classList.remove('-hidden');
	filtersIcon.classList.add('-hidden');
};

const handleRootLeave = () => {
	filtersContent.classList.add('-hidden');
	filtersIcon.classList.remove('-hidden');
};
</script>

<aside onmouseenter={handleRootEnter} onmouseleave={handleRootLeave} class="filters-recap flex flex-col gap-4 absolute left-4 top-4 rounded-xl p-4">
  <i bind:this={filtersIcon} class="icon modak uppercase">voir les filtres</i>
  <div bind:this={filtersContent} class="content -hidden">
    {#each filtersMap as filter}
      <div class="flex flex-col mb-3">
        <h3 class="modak font-bold uppercase text-lg">{filter[0]}</h3>
        <div>{filter[1].join(', ')}</div>
      </div>
    {/each}
  </div>
</aside>

<style>
.filters-recap {
  background-color: var(--purple-accent);
  box-shadow: 6px 6px var(--pink);
}

.modak {
  font-family: "Modak";
}

.-hidden {
  display: none;
}
</style>