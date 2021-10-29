<template>
	<div class="box">
		<img :src="require('@/assets/' + icon)" alt="icon" v-if="icon" />
		<h2 id="title">{{ title }}</h2>
		<p>{{ description }}</p>
		<!-- <v-btn elevation="2" class="button" @click="back"><v-icon left>mdi-chevron-left</v-icon> Back</v-btn> -->
		<v-btn class="ma-2" text @click="back"> <v-icon left> mdi-arrow-left </v-icon>Back </v-btn>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
	props: {
		title: String,
		description: String,
		icon: String
	}
})
export default class ErrorBox extends Vue {
	title!: string;
	description!: string;
	icon!: string;

	back() {
		history.back();
	}
}
</script>

<style scoped lang="scss">
$discord-black: #23272a;
$discord-blurple: #5865f2;

.box {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1.5em;

	box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
	border-radius: 1rem;

	background-color: white;

	text-align: center;

	#title {
		// margin: 1em 1em 2em 1em;
		margin-top: 1em;
		padding: 0 0 20px 0;
		width: 100%;

		font-family: "Open Sans";
		font-weight: 500;
		color: black;
		border-bottom: 1px silver solid;
	}

	img {
		height: 3em;
	}

	h3 {
		margin: 1em;
		font-weight: 500;
	}
	p {
		margin: 0.5em;
	}
	// .button {
	// display: flex;
	// align-items: center;

	// margin-top: 2em;
	// box-shadow: 0px 0px 0px gray;
	// font-weight: 600;
	// }
}
</style>
