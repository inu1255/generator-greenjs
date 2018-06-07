<template>
	<transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
		<keep-alive>
			<slot></slot>
		</keep-alive>
	</transition>
</template>
<script>
const elTransition = '0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out';

export default {
	methods: {
		beforeEnter(el) {
			el.style.transition = elTransition
			if (!el.dataset) el.dataset = {}

			el.dataset.oldPaddingTop = el.style.paddingTop
			el.dataset.oldPaddingBottom = el.style.paddingBottom

			el.style.height = 0
			el.style.paddingTop = 0
			el.style.paddingBottom = 0
		},
		enter(el) {
			el.dataset.oldOverflow = el.style.overflow
			if (el.scrollHeight !== 0) {
				el.style.height = el.scrollHeight + 'px'
				el.style.paddingTop = el.dataset.oldPaddingTop
				el.style.paddingBottom = el.dataset.oldPaddingBottom
			} else {
				el.style.height = ''
				el.style.paddingTop = el.dataset.oldPaddingTop
				el.style.paddingBottom = el.dataset.oldPaddingBottom
			}

			el.style.overflow = 'hidden'
		},
		afterEnter(el) {
			el.style.transition = ''
			el.style.height = ''
			el.style.overflow = el.dataset.oldOverflow
		},
		beforeLeave(el) {
			if (!el.dataset) el.dataset = {}
			el.dataset.oldPaddingTop = el.style.paddingTop
			el.dataset.oldPaddingBottom = el.style.paddingBottom
			el.dataset.oldOverflow = el.style.overflow

			el.style.height = el.scrollHeight + 'px'
			el.style.overflow = 'hidden'
		},
		leave(el) {
			if (el.scrollHeight !== 0) {
				el.style.transition = elTransition
				el.style.height = 0
				el.style.paddingTop = 0
				el.style.paddingBottom = 0
			}
		},
		afterLeave(el) {
			el.style.transition = ''
			el.style.height = ''
			el.style.overflow = el.dataset.oldOverflow
			el.style.paddingTop = el.dataset.oldPaddingTop
			el.style.paddingBottom = el.dataset.oldPaddingBottom
		}
	}
}
</script>