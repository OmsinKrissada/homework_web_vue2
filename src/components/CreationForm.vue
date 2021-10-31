<template>
	<!-- <template> -->
	<!-- <v-row justify="center"> -->
	<!-- <v-col cols="12" sm="10" md="8" lg="6"> -->
	<v-card id="creation-form" :loading="loading" :disabled="loading">
		<v-card-title>
			<h4>Add Homework</h4>
		</v-card-title>
		<v-card-text>
			<v-form ref="form">
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
				<v-autocomplete
					v-model="subject"
					:rules="[() => !!subject || 'This field is required']"
					:items="subjects"
					item-text="name"
					item-value="subID"
					label="Subject"
					placeholder="Select..."
					required
				></v-autocomplete>
				<!-- <v-text-field v-model="date" :rules="[() => !!date || 'This field is required']" label="Date" placeholder="El Paso" required></v-text-field> -->
				<v-dialog ref="date_menu" v-model="date_menu" :close-on-content-click="false" :return-value.sync="date" width="290px" persistent>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field v-model="formatted_date" label="Date" prepend-icon="mdi-calendar" readonly clearable @click:clear="date = ''" v-bind="attrs" v-on="on"></v-text-field>
					</template>
					<v-date-picker v-model="date" color="primary" locale="th-th" :min="new Date().toISOString()" @dblclick:date="$refs.date_menu.save(date)" scrollable>
						<v-spacer></v-spacer>
						<v-btn text color="primary" @click="date_menu = false">
							Cancel
						</v-btn>
						<v-btn text color="primary" @click="$refs.date_menu.save(date)">
							OK
						</v-btn>
					</v-date-picker>
				</v-dialog>
				<v-dialog ref="time_menu" v-model="time_menu" :close-on-content-click="false" :return-value.sync="time" width="290px" persistent>
					<template v-slot:activator="{ on, attrs }">
						<!-- <v-text-field v-model="formatted_date" clearable label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field> -->
						<v-text-field
							v-model="time"
							prepend-icon="mdi-clock-time-four-outline"
							label="Time"
							hint="Leave this field blank for end of the day (midnight)"
							readonly
							clearable
							@click:clear="time = ''"
							v-bind="attrs"
							v-on="on"
						></v-text-field>
					</template>
					<v-time-picker v-model="time" color="primary" format="24hr" full-width scrollable>
						<v-spacer></v-spacer>
						<v-btn text color="primary" @click="time_menu = false">
							Cancel
						</v-btn>
						<v-btn text color="primary" @click="$refs.time_menu.save(time)">
							OK
						</v-btn>
					</v-time-picker>
				</v-dialog>
			</v-form>
		</v-card-text>
		<v-divider class="mt-12"></v-divider>
		<v-card-actions>
			<v-btn text @click="clearAll"> Clear All </v-btn>
			<v-spacer></v-spacer>
			<v-btn :loading="submitting" color="primary" @click="submit"> Submit </v-btn>
		</v-card-actions>
	</v-card>
	<!-- </v-col> -->
	<!-- </v-row> -->
	<!-- </template> -->
</template>

<script lang="ts">
import axios from "axios";
import moment from "moment";
import { Component, Vue, Watch } from "vue-property-decorator";
import { endpoint } from "@/config.json";

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
	// date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10);
	formatted_date = "";
	time = "";

	date_menu = false;
	time_menu = false;

	subjects: any[];
	loading = false;
	submitting = false;

	clearAll() {
		this.date = "";
		this.time = "";
		(this.$refs.form as any).reset();
	}

	appendTime(date: Date, time: string) {
		if (!time) {
			date.setHours(0, 0);
			return date;
		}
		if (!time.match(/\d{1,2}:\d{1,2}/g)) throw `Invalid time string format, provided ${time}`;
		const [hours, mins] = time.split(":");
		date.setHours(+hours, +mins);
		return date;
	}

	submit() {
		if ((this.$refs.form as any).validate()) {
			console.log("submit na krub");
			this.loading = true;
			this.submitting = true;
			axios
				.post(
					endpoint + "/homeworks",
					{
						title: this.title,
						detail: this.detail,
						subject: this.subject,
						dueDate: this.time
							? this.appendTime(new Date(this.date), this.time)
							: moment(this.date)
									.endOf("date")
									.toDate()
					},
					{ headers: { Authorization: localStorage.homework_access_token } }
				)
				.then(() => {
					this.$emit("submitted");
					this.loading = false;
					this.submitting = false;
					this.clearAll();
				})
				.catch(err => {
					this.$emit("error", err);
				});
		}
	}

	mounted() {
		this.formatDate(this.date);
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
