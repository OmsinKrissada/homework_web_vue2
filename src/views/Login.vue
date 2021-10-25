<template>
	<div id="login">
		<LoginForm />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "@/components/LoginForm.vue";

@Component({
	components: {
		LoginForm
	}
})
export default class Login extends Vue {
	redirect!: string;
	mounted() {
		// const params: { [key: string]: any } = window.location.search
		// 	.slice(1)
		// 	.split("&")
		// 	.reduce((acc, param) => {
		// 		const [key, value] = param.split("=");
		// 		return { ...acc, [key]: value };
		// 	}, {});
		// this.redirect = params.redirect;
	}
}
</script>

<style scoped lang="scss">
#login {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
