<script lang="ts">
	import { names, players, round } from '$lib/player';

	$: className = `m-4 grid grid-cols-${2 * round + 3} bg-base-300 gap-4 p-4 rounded-md`;
</script>

<div class={className}>
	<div class="row-span-2 card bg-neutral text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title">Cookies!</h2>
			<p>We are using cookies for no reason.</p>
		</div>
	</div>
	<div class="col-span-2 btn btn-neutral">선발전</div>
	{#each { length: round } as _, i}
		<div class="col-span-2 btn btn-neutral">
			{i + 1}회전
		</div>
	{/each}
	{#each { length: round + 1 } as _, i}
		<div class="btn btn-primary">가넷</div>
		<div class="btn btn-secondary">스피넬</div>
	{/each}

	{#each names as name}
		<a class="btn btn-accent" href={`/${name}`}>{name}</a>
		{#each { length: round + 1 } as _, i}
			<div class="btn btn-base-200 text-lg">{players[name].ganet[i]}</div>
			<div class="btn btn-base-200 text-lg">{players[name].spinel[i]}</div>
		{/each}
	{/each}
</div>
