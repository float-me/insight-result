<script lang="ts">
	import Chart from './chart.svelte';
	import { Player } from '$lib/player';

	export let player: Player;
</script>

<div role="tablist" class="tabs tabs-bordered">
	<input type="radio" name="ganet-tab" role="tab" class="tab" aria-label="가넷" checked={true} />
	<div role="tabpanel" class="tab-content">
		<div class="card bg-base-200 shadow-xl">
			<div class="card-body">
				<Chart
					series={{
						name: '가넷',
						data: player.ganet
					}}
				/>
			</div>
		</div>
	</div>

	<input type="radio" name="ganet-tab" role="tab" class="tab" aria-label="스피넬" />
	<div role="tabpanel" class="tab-content">
		<div class="card bg-base-200 shadow-xl">
			<div class="card-body">
				<Chart
					series={{
						name: '스피넬',
						data: player.spinel
					}}
				/>
			</div>
		</div>
	</div>
</div>
