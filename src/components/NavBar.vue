<template>
	<div class="box">
		<v-dialog v-model="dialog" width="600">
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon v-bind="attrs" v-on="on">
					<v-icon color="white" x-large>mdi-cog</v-icon>
				</v-btn>
			</template>
			<v-card class="rounded-lg">
				<v-toolbar dark color="teal lighten-2">
					<v-toolbar-title>Settings</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn icon dark @click="dialog = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar>
				<v-divider></v-divider>
				<v-list>
					<v-subheader>General</v-subheader>
					<v-list-item>
						<v-list-item-action>
							<v-switch v-model="set_darktheme"></v-switch>
						</v-list-item-action>
						<!-- <v-list-item-icon></v-list-item-icon> -->
						<v-list-item-content>
							<v-list-item-title><v-icon left>mdi-weather-night</v-icon> Dark Mode</v-list-item-title>
							<v-list-item-subtitle>Toggles between light and dark mode</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
					<v-subheader>Notification</v-subheader>
					<v-list-item disabled>
						<v-list-item-action>
							<v-switch v-model="notify_all"></v-switch>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title> <v-icon left>mdi-bell</v-icon> Homework Notification</v-list-item-title>
							<v-list-item-subtitle>Controls homework deadline notifications</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
					<v-list-item disabled>
						<v-list-item-action>
							<v-checkbox v-model="notify_1m"></v-checkbox>
						</v-list-item-action>
						<v-list-item-title>Notify 1 minute before deadline</v-list-item-title>
					</v-list-item>

					<v-list-item disabled>
						<v-list-item-action>
							<v-checkbox v-model="notify_5m"></v-checkbox>
						</v-list-item-action>
						<v-list-item-title>Notify 5 minutes before deadline</v-list-item-title>
					</v-list-item>

					<v-list-item disabled>
						<v-list-item-action>
							<v-checkbox v-model="notify_1h"></v-checkbox>
						</v-list-item-action>
						<v-list-item-title>Notify 1 hour before deadline</v-list-item-title>
					</v-list-item>
					<v-subheader>Account</v-subheader>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title>
								<v-avatar size="2em" class="avatar">
									<img :src="`https://cdn.discordapp.com/avatars/${user_id}/${user_avatar}.jpg`" :alt="user_tag" />
								</v-avatar>
								Logged in as <strong>{{ user_tag }}</strong>
							</v-list-item-title>
							<!-- <v-list-item-subtitle>Toggles between light and dark mode.</v-list-item-subtitle> -->
						</v-list-item-content>
						<v-btn color="error" text @click="logout">Logout</v-btn>
					</v-list-item>
				</v-list>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class NavBar extends Vue {
	dialog = false;
	set_darktheme = null;

	notify_all = false;
	notify_1m = false;
	notify_5m = false;
	notify_1h = false;

	user_tag = localStorage["user_tag"];
	user_id = localStorage["user_id"];
	user_avatar = localStorage["user_avatar"];

	mounted() {
		this.set_darktheme = localStorage.getItem("homework_settings_darktheme") == "true" ? true : false;
		this.$vuetify.theme.dark = this.set_darktheme;
	}

	logout() {
		localStorage.removeItem("access_token");
		this.$router.push("/");
		this.dialog = false;
	}

	@Watch("set_darktheme")
	public changeTheme(darktheme) {
		console.log(darktheme);
		this.$vuetify.theme.dark = darktheme;
		localStorage.setItem("homework_settings_darktheme", darktheme);
	}
}
</script>

<style scoped lang="scss">
.avatar {
	margin-right: 10px;
}
</style>
