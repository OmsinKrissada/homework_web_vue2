<template>
	<v-app id="app">
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
		<router-view class="router-view" />
		<!-- </v-main> -->
	</v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "App",

	data: () => ({
		//
	})
});
</script>

<style lang="scss">
@import url("https://rsms.me/inter/inter.css");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap");
#app {
	// min-width: 100vw;
	min-height: 100vh;
	background: #282292;
	background: linear-gradient(120deg, rgba(12, 10, 48, 1) 0%, rgba(21, 21, 84, 1) 35%, rgba(10, 89, 105, 1) 100%);
	background-size: cover;
	font-family: "Inter";
	overflow-y: auto;
}
.router-view {
	overflow-y: auto;
	// width: 100%;
	// height: fit-content;
}
.button {
	cursor: pointer;
	margin: 1em;
	padding: 1em 2em;
	// background: none;
	border: none;
	border-radius: 0.5em;
	box-shadow: 0px 0px 3px gray;

	// font-size: 0.9rem;
	color: black;
}
</style>
