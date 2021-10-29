<template>
	<!-- <template> -->
	<!-- <v-row justify="center"> -->
	<!-- <v-col cols="12" sm="10" md="8" lg="6"> -->
	<v-card :loading="loading" :disabled="loading">
		<v-card-title>
			<h4>Add Homework</h4>
		</v-card-title>
		<v-card-text>
			<v-form id="creation-form" ref="form">
				<v-text-field
					v-model="title"
					:rules="[() => !!title || 'This field is required']"
					clearable
					clear-icon="mdi-close-circle"
					label="Title"
					placeholder="Finish P.18 in the book"
					required
				></v-text-field>
				<v-textarea
					v-model="detail"
					hint="Multiline support"
					rows="1"
					auto-grow
					counter="150"
					:rules="[() => !detail || detail.length <= 150 || 'Maximum is 150 characters']"
					maxlength="150"
					clearable
					clear-icon="mdi-close-circle"
					label="Detail"
				></v-textarea>
				<v-autocomplete v-model="subject" :rules="[() => !!subject || 'This field is required']" :items="subjects" label="Subject" placeholder="Select..." required></v-autocomplete>
				<!-- <v-text-field v-model="date" :rules="[() => !!date || 'This field is required']" label="Date" placeholder="El Paso" required></v-text-field> -->
				<v-menu ref="date_menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
					<template v-slot:activator="{ on, attrs }">
						<v-text-field v-model="formatted_date" clearable label="Pick a date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
					</template>
					<v-date-picker v-model="date" color="primary" locale="th-th" :min="new Date().toISOString()" no-title scrollable reactive>
						<v-spacer></v-spacer>
						<v-btn text color="primary" @click="menu = false">
							Cancel
						</v-btn>
						<v-btn text color="primary" @click="$refs.date_menu.save(date)">
							OK
						</v-btn>
					</v-date-picker>
				</v-menu>
				<v-text-field v-model="time" prepend-icon="mdi-clock" :rules="[() => !!time || 'This field is required']" label="Time" required placeholder="TX"></v-text-field>
				<!-- <v-text-field ref="zip" v-model="zip" :rules="[() => !!zip || 'This field is required']" label="ZIP / Postal Code" required placeholder="79938"></v-text-field> -->
			</v-form>
		</v-card-text>
		<v-divider class="mt-12"></v-divider>
		<v-card-actions>
			<v-btn text @click="clearAll">
				Clear All
			</v-btn>
			<v-spacer></v-spacer>
			<!-- <v-slide-x-reverse-transition>
					<v-tooltip v-if="formHasErrors" left>
						<template v-slot:activator="{ on, attrs }">
							<v-btn icon class="my-0" v-bind="attrs" @click="resetForm" v-on="on">
								<v-icon>mdi-refresh</v-icon>
							</v-btn>
						</template>
						<span>Refresh form</span>
					</v-tooltip>
				</v-slide-x-reverse-transition> -->
			<v-btn :loading="submitting" color="primary" @click="submit">
				Submit
			</v-btn>
		</v-card-actions>
	</v-card>
	<!-- </v-col> -->
	<!-- </v-row> -->
	<!-- </template> -->
</template>

<script lang="ts">
import moment from "moment";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
	props: {
		subjects: Array
	}
})
export default class CreationForm extends Vue {
	title = "";
	detail = "";
	subject = "";
	date = "";
	formatted_date: string;
	time = "";

	menu = false;

	subjects: any[];
	loading = false;
	submitting = false;

	clearAll() {
		(this.$refs.form as any).reset();
	}

	submit() {
		if ((this.$refs.form as any).validate()) {
			console.log("submit na krub");
			this.loading = true;
			this.submitting = true;
		}
	}

	@Watch("date")
	public formatDate(date) {
		if (!date) return null;
		const format = {
			sameDay: "[Today]",
			nextDay: "[Tomorrow]",
			nextWeek: "[Upcoming] dddd",
			lastDay: "[Yesterday]",
			lastWeek: "[Last] dddd",
			sameElse: "[]"
		};
		const calendar_format = moment(date).calendar(format);
		this.formatted_date = `${moment(date).format("LL")} ${calendar_format ? `(${calendar_format})` : ""}`.trim();
	}
}
</script>

<style lang="scss" scoped></style>
