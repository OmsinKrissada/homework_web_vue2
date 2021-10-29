<template>
	<v-card id="dashboard" elevation="5" outlined :style="loading && 'background-color: transparent; box-shadow: none; border: none;'">
		<v-scroll-y-transition>
			<v-alert v-if="error" type="error" class="ma-5" prominent>
				<v-row align="center">
					<v-col class="grow"> {{ error }} </v-col>
					<v-col class="shrink">
						<v-btn color="primary" @click="reload()"><v-icon left>mdi-reload</v-icon>Reload Now</v-btn>
					</v-col>
				</v-row>
			</v-alert>
			<v-alert v-if="warning" type="warning" text border="left" class="ma-5" prominent>
				<v-row align="center">
					<v-col class="grow"> {{ warning }} </v-col>
					<v-col class="shrink">
						<v-btn color="primary" @click="reload()"><v-icon left>mdi-login</v-icon>Go to signin page</v-btn>
					</v-col>
				</v-row>
			</v-alert>
		</v-scroll-y-transition>
		<div id="dashboard-container" v-show="!loading && !error && !warning">
			<HomeworkTable :homeworks="homeworks" class="hw-table" @updateHomework="updateHomework" />
			<CreationForm :subjects="subjects.map(hw => `${hw.name}`).sort()" class="form" />
		</div>
		<v-overlay :value="loading">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeworkTable from "@/components/HomeworkTable.vue";
import CreationForm from "@/components/CreationForm.vue";
import { endpoint } from "@/config.json";
import axios from "axios";
import moment from "moment";

@Component({
	components: {
		HomeworkTable,
		CreationForm
	}
})
export default class Dashboard extends Vue {
	loading = true;
	error = "";
	warning = "";

	subjects: any[] = [];
	homeworks: any[] = [];

	reload() {
		location.reload();
	}

	async updateHomework() {
		console.log("called update hw");
		let res;
		try {
			res = await axios.get(endpoint + "/list/full", { headers: { authorization: localStorage.homework_access_token } });
		} catch (err) {
			this.error = `Failed to refresh: ${err}`;
		}
		console.log(this.subjects);
		(res.data as any).forEach((hw: any) => {
			hw.subject = this.subjects.filter(s => s.subID == hw.subID)[0]?.name ?? "Unknown Subject";
			hw.due = moment(hw.dueDate).format("LLL");
			hw.detail = hw.detail || "-";
		});
		this.homeworks = res.data as any;
	}

	logout() {
		localStorage.removeItem("homework_access_token");
		this.$router.replace("/");
	}

	async mounted() {
		try {
			this.subjects = ((await axios.get(endpoint + "/subjects", {
				headers: {
					authorization: localStorage.homework_access_token
				}
			})) as any).data;
			await this.updateHomework();
		} catch (err) {
			if (!axios.isAxiosError(err)) {
				this.error = err + " This isn't supposed to happen, please contact Omsin.";
			} else if (!err.response) {
				this.error = "Failed to connect to server. Please check your internet connection or the server might be offline. Contact Omsin to make sure if it's intentional.";
			} else if (err.response.status == 401) {
				this.warning = "Session expired. Please click the button on the right if redirect doesn't happen automatically.";
				this.logout();
			}
		}
		this.loading = false;
	}
}
</script>

<style lang="scss" scoped>
#dashboard {
	position: relative;
	margin: 50px 30px;
	background-color: whitesmoke;

	#dashboard-container {
		position: relative;

		display: grid;
		justify-content: space-around;
		align-content: center;
		gap: 50px 0px;

		margin: 100px 0px;

		.hw-table {
			grid-column: 1 / -1;
			width: 1000px;
			@media screen and (max-width: 1400px) {
				grid-column: none;
				min-width: 0;
				width: 90vw;
			}
		}

		.form {
			// position: sticky;
			grid-column: 2 / 2;
			// margin: 2em;
			width: 400px;
			height: fit-content;
			@media screen and (max-width: 1400px) {
				grid-column: none;
				min-width: none;
				width: 90vw;
			}
		}
		@media screen and (max-width: 1400px) {
			top: 0;
			justify-content: center;
		}
	}
	@media screen and (max-width: 1400px) {
		top: 0;
		margin: 0;
		background: transparent;
	}
}
</style>
