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
				sort-by="due"
				:search="search"
				:loading="loading"
				:page.sync="page"
				:items-per-page="15"
				@page-count="page_count = $event"
				show-expand
				:single-expand="true"
				hide-default-footer
				dense
			>
				<template v-slot:top>
					<v-card-title>
						<h4>Homework</h4>
						<v-tooltip right>
							<template v-slot:activator="{ on, attrs }">
								<v-btn icon text :loading="refreshing" class="ma-3" @click="refresh" v-bind="attrs" v-on="on"> <v-icon> mdi-refresh </v-icon></v-btn>
							</template>
							<span>Refresh data</span>
						</v-tooltip>
						<v-spacer></v-spacer>
						<v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line></v-text-field>
					</v-card-title>
					<v-checkbox v-model="show_ended" label="Show ended homework" class="pa-3"></v-checkbox>
					<!-- <v-dialog v-model="dialog" max-width="500px">
							<template v-slot:activator="{ on, attrs }">
								<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
									New Item
								</v-btn>
							</template>
							<v-card>
								<v-card-title>
									<span class="text-h5">{{ formTitle }}</span>
								</v-card-title>

								<v-card-text>
									<v-container>
										<v-row>
											<v-col cols="12" sm="6" md="4">
												<v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
											</v-col>
											<v-col cols="12" sm="6" md="4">
												<v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
											</v-col>
										</v-row>
									</v-container>
								</v-card-text>

								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="blue darken-1" text @click="close">
										Cancel
									</v-btn>
									<v-btn color="blue darken-1" text @click="save">
										Save
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog> -->

					<v-dialog v-model="dialog_delete" max-width="500px">
						<v-card>
							<v-card-title id="delete-title" class="justify-center">Do you want to delete this homework?</v-card-title>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn class="ma-3" color="primary" text @click="clearDeleteDialog">Cancel</v-btn>
								<v-btn class="ma-3" color="error" link @click="deleteHomework"> <v-icon left>mdi-delete</v-icon> Delete</v-btn>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</template>

				<template v-slot:item.actions="{ item }">
					<!-- <v-icon small class="mr-2" @click="editItem(item)">
						mdi-pencil
					</v-icon> -->
					<v-icon small color="red" @click="openDeleteDialog(item)"> mdi-delete </v-icon>
				</template>
				<template v-slot:item.data-table-expand="{ item, isExpanded, expand }">
					<v-icon @click="expand(true)" v-if="item.detail && !isExpanded">mdi-chevron-down</v-icon>
					<v-icon @click="expand(false)" v-if="item.detail && isExpanded">mdi-chevron-up</v-icon>
				</template>
				<template v-slot:expanded-item="{ headers, item }">
					<td :colspan="headers.length" class="pa-3">{{ item.detail }}</td>
				</template>
			</v-data-table>
		</v-card>
		<v-pagination v-model="page" :length="page_count" class="ma-3"></v-pagination>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { endpoint } from "@/config.json";

@Component({
	props: {
		homeworks: Array
	}
})
export default class HomeworkTable extends Vue {
	loading = false;
	error = "";

	refreshing = false;

	search = "";
	show_ended = false;
	page = 1;
	page_count = 0;

	pending_delete_hw: any;
	dialog_delete = false;

	headers = [
		{ text: "ID", align: "start", value: "id" },
		{ text: "Title", value: "title" },
		{ text: "Subject", value: "subject" },
		{ text: "Due", value: "due" },
		{ text: "Actions", value: "actions", sortable: false, align: "center" }
	];

	homeworks: any[];

	async refresh() {
		this.refreshing = true;
		this.$emit("updateHomework");
		this.refreshing = false;
	}

	openDeleteDialog(hw) {
		this.pending_delete_hw = hw;
		this.dialog_delete = true;
	}

	clearDeleteDialog() {
		this.pending_delete_hw = null;
		this.dialog_delete = false;
	}

	deleteHomework() {
		axios
			.delete(endpoint + "/homeworks/" + this.pending_delete_hw.id, { headers: { Authorization: localStorage.homework_access_token } })
			.then(() => {
				this.$emit("deleted");
			})
			.catch(err => {
				this.$emit("error", err);
			})
			.finally(() => {
				this.dialog_delete = false;
			});
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
