<template>
	<div id="login-form">
		<img src="@/assets/book-dark.png" alt="logo" id="logo" />
		<h2 id="title" class="noselect">Please signin to continue</h2>
		<div id="form" class="noselect">
			<v-btn :href="auth_link" class="button discord-login">
				<img src="@/assets/icon_clyde_white_RGB.png" id="clyde" />
				Continue with Discord
			</v-btn>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { client_id } from "@/config.json";

@Component({})
export default class LoginForm extends Vue {
	auth_link = "";
	created() {
		this.auth_link = `https://discord.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(
			window.location.origin
		)}%2Fcallback&response_type=code&scope=identify+guilds&state=${encodeURIComponent("/dashboard")}`;
	}

	mounted() {
		for (const b of document.getElementsByClassName("button")) {
			const child = document.createElement("span");
			child.className = "btn-hover-effect";
			b.appendChild(child);
			(b as any).onmousemove = function(b) {
				console.log("changing");

				var e = b.currentTarget.getBoundingClientRect(),
					s = b.clientX - e.left,
					a = b.clientY - e.top;
				(child.style.left = s + "px"), (child.style.top = a + "px");
			};
		}
	}
}
</script>

<style scoped lang="scss">
$discord-black: #23272a;
$discord-blurple: #5865f2;

#logo {
	margin: 20px 0 0 0;
	height: 6em;
	border-radius: 50%;
	box-shadow: 0px 0px 5px black;
}

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

#login-form {
	display: flex;
	flex-direction: column;
	align-items: center;
	// padding: 2em;

	box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
	border-radius: 1rem;

	background-color: white;

	text-align: center;

	#form {
		padding: 10px 40px;

		.discord-login {
			display: flex;
			align-items: center;

			padding: 1.5em 2em;

			background-color: $discord-blurple;
			// box-shadow: 0px 0px 3px $discord-blurple;

			text-transform: none;
			// font-weight: 600;
			color: white;

			transition: 0.2s box-shadow;

			// &:hover {
			// 	box-shadow: none;
			// }
		}
		#clyde {
			margin-right: 1em;
			height: 1em;
			width: auto;
		}
	}
}
// .button:hover{

// }

.btn-hover-effect {
	z-index: 5;
	content: "";
	position: absolute;
	left: 0;
	top: 0;
	width: 0;
	height: 0;
	background: radial-gradient(circle closest-side, #6773f3, transparent);
	transform: translate(-50%, -50%);
	transition: width 0.2s ease, height 0.2s ease;
}
</style>
