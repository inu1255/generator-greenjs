<template>
	<div id="app">
		<transition v-if="user" :enter-active-class="'animated '+enter" :leave-active-class="'animated '+leave">
			<router-view></router-view>
		</transition>
		<Login v-else></Login>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "app",
    data() {
        return { in: 0
        }
    },
    computed: {
		...mapState({
			user: state=>state.user.user
		}),
        enter() {
            if (this.in > 0) return "fadeInRight"
            if (this.in < 0) return "fadeInLeft"
            return this.login_enter
        },
        leave() {
            if (this.in < 0) return "fadeOutRight"
            if (this.in > 0) return "fadeOutLeft"
            return this.login_leave
        },
        login_enter() {
            if (this.user) return "fadeIn"
            return "fadeIn"
        },
        login_leave() {
            if (this.user) return "fadeOut"
            return "fadeOutDown"
        },
    },
    watch: {
        '$route' (to, from) {
            this.in = to.params.origin || 0
        }
    }
}
</script>
