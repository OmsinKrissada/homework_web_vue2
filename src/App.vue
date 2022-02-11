<template>
	<v-app :style="{ background: backgroundColor }">
		<!-- <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->

		<!-- <v-main> -->
		<NavBar v-if="this.$route.path == '/dashboard'" class="ma-5" />
		<router-view class="router-view" />
		<v-footer dark padless class="ma-6 transparent">
			<v-row justify="center">
				<v-col cols="12" class="text-center"><v-divider></v-divider></v-col>
				<v-col cols="12" class="text-center"
					><small
						>Commit — <span class="code">{{ hash }}</span></small
					></v-col
				>

				<v-col cols="12" class="text-center"><v-icon small>mdi-copyright</v-icon> {{ new Date().getFullYear() }} <strong>Krissada Singhakachain</strong>. All rights reserved.</v-col>
			</v-row>
		</v-footer>

		<!-- </v-main> -->
	</v-app>
</template>

<script lang="ts">
// import { Component, Vue } from "vue-property-decorator";
import Vue from "vue";
import NavBar from "@/components/NavBar.vue";
import { commit_hash } from "./config.json";

export default Vue.extend({
	name: "App",
	components: {
		NavBar
	},
	data: () => {
		return {
			hash: commit_hash
		};
	},
	mounted: () => {
		console.log();
	},
	computed: {
		backgroundColor() {
			return this.$vuetify.theme.dark ? "#001329" : "linear-gradient(120deg, rgba(12, 10, 48, 1) 0%, rgba(21, 21, 84, 1) 35%, rgba(10, 89, 105, 1) 100%)";
		}
	}
});
</script>

<style lang="scss">
@import url("https://rsms.me/inter/inter.css");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap");
#app {
	// min-width: 100vw;
	min-height: 100vh;
	background-size: cover;
	font-family: "Inter";
	overflow-y: auto;
	// background: #282292;
}

.router-view {
	overflow-y: auto;
	// width: 100%;
	// height: fit-content;
}

.code {
	font-family: "Consolas", monospace;
}

.footer {
	// background-color: rgba(255, 255, 255, 0.158);
}

.button {
	position: relative;
	cursor: pointer;
	margin: 1em;
	padding: 1em 2em;
	// background: none;
	border: none;

	// font-size: 0.9rem;
	color: black;

	overflow: hidden;
}

.button * {
	z-index: 10;
}

.button .btn-hover-effect {
	color: hsl(235, 86%, 65%);
	// color: #7a93f5;
	color: hsl(211, 100%, 49%);
	color: hsl(204, 100%, 66%);
	z-index: 5;
	content: "";
	position: absolute;
	left: 0;
	top: 0;
	width: 0;
	height: 0;
	background: radial-gradient(circle closest-side, hsl(221, 100%, 70%), transparent);
	transform: translate(-50%, -50%);
	transition: width 0.2s ease, height 0.2s ease;
}

.button:hover .btn-hover-effect {
	width: 300px;
	height: 300px;
}

/* width */
::-webkit-scrollbar {
	width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
	background: var(--v-accent-darken4);
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: var(--v-scroll_track-base);
	border-radius: 50px;
}
</style>
