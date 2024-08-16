<script lang="ts">
	import { Player } from '$lib/player';

	export let player: Player;
</script>

<div class="join join-vertical">
	{#each player.history as history, i}
		<div class="collapse collapse-arrow bg-base-200 join-item border-base-300 border">
			<input type="radio" name="my-accordion-1" />
			<div class="collapse-title text-xl font-medium">
				{#if history.detail}
					{history.text}: {history.detail}
				{:else}
					{history.text}
				{/if}
			</div>
			<div class="collapse-content">
				{#if history.ganet}
					<div class="badge badge-primary">
						가넷:
						{#if history.ganet > 0}
							+
						{/if}
						{history.ganet}
					</div>
				{/if}

				{#if history.spinel}
					<div class="badge badge-secondary">
						스피넬:
						{#if history.spinel > 0}
							+
						{/if}
						{history.spinel}
					</div>
				{/if}

				{#if !history.ganet && !history.spinel}
					<p>보유 재화에는 변화가 없습니다.</p>
				{/if}
			</div>
		</div>
	{/each}
</div>
