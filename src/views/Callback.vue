<template>
	<div id="callback">
		<v-progress-linear v-if="!error_title" id="loader" color="light-blue" height="10" indeterminate></v-progress-linear>
		<transition name="fade" mode="in-out">
			<!-- <div v-if="error" class="box">
				<h2>
					An error occured with status code <code style="font-family: monospace;">{{ error_code }}</code>
				</h2>
				<h3>
					<code style="font-family: monospace;">{{ error }}</code>
				</h3>
				<p>Please send this to Omsin if you're sure it's not your fault.</p>
				<a href="javascript:history.back()">Click here to try again</a>
			</div> -->
			<ErrorBox v-if="error_title" :title="error_title" :description="error_desc" :icon="error_icon" id="error-box" />
		</transition>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ErrorBox from "@/components/ErrorBox.vue";
import { endpoint } from "@/config.json";
import axios from "axios";
import router from "@/router";

@Component({
	components: {
		ErrorBox
	}
})
export default class Callback extends Vue {
	error_icon = "";
	error_title = "";
	error_desc = "";
	async mounted(): Promise<void> {
		const params: { [key: string]: any } = window.location.search
			.slice(1)
			.split("&")
			.reduce((acc, param) => {
				const [key, value] = param.split("=");
				return { ...acc, [key]: value };
			}, {});

		let response;
		try {
			response = (await axios.post(endpoint + "/auth/discord", params)).data as any;
		} catch (err) {
			if (!axios.isAxiosError(err)) {
				console.log(err);
				return;
			}
			if (err.response?.status == 403) {
				this.error_icon = "padlock.png";
				this.error_title = "No Access";
				this.error_desc = "You must share a server with the bot.\nConsider changing account";
				return;
			}
			if (!err.response?.status) {
				this.error_icon = "no-wifi.png";
				this.error_title = "Connection Error";
				this.error_desc = "Please check your internet connection or the server is offline.";
				return;
			}
			this.error_icon = "error.png";
			this.error_title = "Error";
			this.error_desc = `${err.response?.data} (status code: ${err.response?.status})`;
			return;
		}
		if (!response) {
			this.error_icon = "error.png";
			this.error_title = "Error";
			this.error_desc = "Response is unexpectedly empty";
			return;
		}

		const { access_token } = response;
		localStorage.setItem("homework_access_token", access_token);
		router.push(decodeURIComponent(params.state));
	}
}
</script>

<style scoped lang="scss">
#callback {
	display: flex;
	justify-content: center;
	align-items: center;

	height: 100vh;
}

#error-box {
	// background-color: black;
	transition: 0.5s;
}

#loader {
	position: absolute;
	top: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
