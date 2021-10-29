<template>
	<div>
		<v-card class="card">
			<v-alert v-if="error" type="error" color="red" border="left" text class="ma-2" prominent>
				<v-row align="center">
					<v-col class="grow">
						{{ error }}
					</v-col>
					<v-col class="shrink">
						<v-btn icon color="secondary" @click="error = ''"><v-icon>mdi-close</v-icon></v-btn>
					</v-col>
				</v-row>
			</v-alert>
			<v-data-table
				class="table"
				:headers="headers"
				:items="show_ended ? homeworks : homeworks.filter(hw => !hw.deletedAt)"
				:search="search"
				:loading="loading"
				hide-default-footer
				:page.sync="page"
				:items-per-page="10"
				@page-count="page_count = $event"
				dense
			>
				<template v-slot:top>
					<v-card-title>
						<h4>Homework</h4>
						<v-tooltip right>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									icon
									text
									:loading="refreshing"
									class="ma-3"
									@click="
										refresh;
										refresh_snackbar = true;
									"
									v-bind="attrs"
									v-on="on"
								>
									<v-icon> mdi-refresh </v-icon></v-btn
								>
							</template>
							<span>Refresh data</span>
						</v-tooltip>
						<v-spacer></v-spacer>
						<v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line></v-text-field>
					</v-card-title>
					<v-checkbox v-model="show_ended" label="Show ended homework" class="pa-3"></v-checkbox>
				</template>
			</v-data-table>

			<!-- Temporary put the snackbar here... will be moved into Dashboard later -->
			<v-snackbar color="info" v-model="refresh_snackbar">
				Data Refreshed
				<template v-slot:action="{ attrs }">
					<v-btn text v-bind="attrs" @click="refresh_snackbar = false">
						Close
					</v-btn>
				</template>
			</v-snackbar>
		</v-card>
		<v-pagination v-model="page" :length="page_count" class="ma-3"></v-pagination>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
	props: {
		homeworks: Array
	}
})
export default class HomeworkTable extends Vue {
	loading = false;
	error = "";

	refreshing = false;
	refresh_snackbar = false;

	search = "";
	show_ended = false;
	page = 1;
	page_count = 0;

	headers = [
		{
			text: "ID",
			align: "start",
			sortable: false,
			value: "id"
		},
		{ text: "Title", value: "name" },
		// { text: "Description", value: "detail" },
		{ text: "Subject", value: "subject" },
		{ text: "Due", value: "due" }
	];

	homeworks: any[];

	async refresh() {
		this.refreshing = true;
		// try {
		await this.getHomework();
		// } catch (err) {
		// 	console.error("failed to refresh: " + err);
		// 	this.error = "Failed to refresh: " + err.message;
		// }
		this.refreshing = false;
	}

	async getHomework() {
		this.loading = true;
		this.$emit("updateHomework");
		this.loading = false;
	}

	async mounted() {
		// try {
		// 	await this.getHomework();
		// } catch (err) {
		// 	console.error("failed to load table data: " + err);
		// 	this.error = "Failed to load: " + err.message;
		// }

		this.loading = false;
	}
}
</script>

<style lang="scss" scoped>
.card {
	// width: 100%;
	height: fit-content;
	// padding: 10px;
	margin: 0px;

	transition: 0.5s;
}
.table {
	transition: 0.5s;
}
</style>
