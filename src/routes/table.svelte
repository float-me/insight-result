<script lang="ts">
	import { names, players, round } from '$lib/player';

	$: className = `m-4 grid grid-cols-11 bg-base-300 gap-2 p-2 rounded-md`;
</script>

<div class={className}>
	<div class="btn btn-neutral row-span-2">이름</div>
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
		{#if players[name].alive}
			<a class="btn btn-accent" href={`/${name}`}>{name}</a>
		{:else}
			<a class="btn btn-neutral" href={`/${name}`}>{name}</a>
		{/if}

		{#each { length: round + 1 } as _, i}
			{#if players[name].ganet[i] !== undefined}
				<div class="btn btn-base-200 text-lg">{players[name].ganet[i]}</div>
				<div class="btn btn-base-200 text-lg">{players[name].spinel[i]}</div>
			{:else}
				<div class="btn btn-neutral"></div>
				<div class="btn btn-neutral"></div>
			{/if}
		{/each}
	{/each}
</div>
