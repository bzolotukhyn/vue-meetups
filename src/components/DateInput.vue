<template>
    <v-menu
        v-model="showMenu"
        :close-on-content-click="false"
        offset-y
        bottom
        max-width="290px"
        min-width="290px">
        <template v-slot:activator="{ on }">
            <v-text-field v-on="on" :value="value" label="Date" readonly>
                <v-btn slot="prepend-inner" icon v-on="on">
                    <v-icon>mdi-calendar</v-icon>
                </v-btn>
            </v-text-field>
        </template>
        <v-date-picker
            :value="value"
            @input="
                $emit('input', $event);
                showMenu = false;
            "
            no-title
            :min="minDate"/>
    </v-menu>
</template>

<script>
export default {
    name: 'DateInput',
    props: {
        minDate: String,
        value: String,
    },
    data() {
        return {
            showMenu: false,
        };
    },
};
</script>
