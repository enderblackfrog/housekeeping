<template>
	<div class="housekeeping-head">
		<div class="housekeeping-head-left">
			<div class="housekeeping-icon-back" @click="goToPage(-1)"></div>
		</div>
		<div class="housekeeping-head-title">
			{{title}}
		</div>
		<div class="housekeeping-head-right">
			<div class="housekeeping-icon-back"></div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			title:String,
      mypath:String
		}
	}
</script>

<style>

</style>
