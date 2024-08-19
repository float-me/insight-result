<script lang="ts">
	import ApexCharts from 'apexcharts';
	import { onMount } from 'svelte';

	const range = (start: number, end: number) =>
		Array.from({ length: end - start }, (v, k) => k + start);

	export let series;
	let round: number = series.data.length;

	const chartConfig = {
		series: [series],
		chart: {
			type: 'line',
			height: 240,
			toolbar: {
				show: false
			}
		},
		title: {
			show: ''
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			lineCap: 'round',
			curve: 'smooth'
		},
		markers: {
			size: 0
		},
		xaxis: {
			axisTicks: {
				show: false
			},
			axisBorder: {
				show: false
			},
			categories: ['선발전', ...range(1, round + 1).map((n) => `${n}회전`)]
		},
		yaxis: {
			max: Math.max(...series.data) + 1,
			min: 0,
			stepSize: 1
		},
		grid: {
			show: true,
			strokeDashArray: 5,
			xaxis: {
				lines: {
					show: true
				}
			},
			padding: {
				top: 5,
				right: 20
			}
		},
		fill: {
			opacity: 0.8
		},
		tooltip: {
			theme: 'dark'
		},
		theme: {
			palette: 'palette7' // upto palette10
		}
	};

	let chartElem: HTMLDivElement;
	onMount(async () => {
		const chart = new ApexCharts(chartElem, chartConfig);
		chart.render();
	});
</script>

<div bind:this={chartElem}></div>
