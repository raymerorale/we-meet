<template>
	<v-alert dismissible type="error" @input='onClose' :value='true'>
		{{ text }}
    </v-alert>
</template>
<script>
export default {
	methods: {
		onClose () {
			this.$emit('dismissed')
		}
	},
	props: ['text']
}
</script>