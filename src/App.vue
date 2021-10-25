<template>
	<!-- <div id="nav">
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link>
	</div> -->
	<div id="app">
		<router-view class="view" />
	</div>
</template>

<style lang="scss">
@import url("https://rsms.me/inter/inter.css");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap");
:root {
	font-size: 15px;
}

* {
	margin: 0;
	box-sizing: border-box;
	font-family: "Inter";
}

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	// background: rgb(36, 45, 59);
	background: rgb(12, 10, 48);
	background: linear-gradient(120deg, rgba(12, 10, 48, 1) 0%, rgba(21, 21, 84, 1) 35%, rgba(10, 89, 105, 1) 100%);

	text-align: center;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	color: #2c3e50;
}

.view {
	min-width: 100vw;
	min-height: 100vh;
}

a {
	text-decoration: none;
	font-weight: 600;
	color: rgb(63, 60, 133);
}

.button {
	cursor: pointer;
	margin: 1em;
	padding: 1em 2em;
	// background: none;
	border: none;
	border-radius: 0.5em;
	box-shadow: 0px 0px 3px gray;

	font-size: 0.9rem;
	color: black;
}

.noselect {
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Old versions of Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
