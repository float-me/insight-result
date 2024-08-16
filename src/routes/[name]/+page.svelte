<script lang="ts">
	import { players } from '$lib/player';
	import ChartCard from './chart-card.svelte';
	import Timeline from './timeline.svelte';
	export let data;

	let player = players[data.name];
</script>

<div class="flex flex-wrap gap-4 m-4">
	<div class="card bg-base-200 w-96 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">{data.name}</h2>
			<p>If a dog chews shoes whose shoes does he choose?</p>
			<div class="card-actions justify-end">
				<button class="btn btn-primary">Buy Now</button>
			</div>
		</div>
	</div>

	<ChartCard {player} />
	<Timeline {player} />
</div>
