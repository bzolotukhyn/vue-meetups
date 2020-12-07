<template>
    <v-menu
        :close-on-content-click="false"
        offset-y
        bottom
        @input="menuInputHandler"
        max-width="290px"
        min-width="290px">
        <template v-slot:activator="{ on }">
            <v-text-field v-on="on" :value="value" label="Date" readonly>
                <v-btn slot="prepend-inner" icon v-on="on">
                    <v-icon>mdi-calendar</v-icon>
                </v-btn>
            </v-text-field>
        </template>
        <v-time-picker
            no-title
            ref="timePicker"
            format="24hr"
            :value="value"
            @input="$emit('input', $event)"/>
    </v-menu>
</template>

<script>
export default {
    name: 'TimeInput',
    props: {
        value: String,
    },
    methods: {
        menuInputHandler(isOpened) {
            if (!isOpened && !this.$refs.timePicker.selectingHour) {
                this.$refs.timePicker.selectingHour = true;
            }
        },
    },
};
</script>
