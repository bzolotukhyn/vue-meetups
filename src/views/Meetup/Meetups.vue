<template>
    <v-container>
        <v-row v-for="meetup in meetups" :key="meetup.id">
            <v-col>
                <v-card
                    elevation="5"
                    link
                    :to="{ name: 'Meetup', params: { id: meetup.id } }">
                    <v-row style="margin: 0">
                        <v-col cols="12" sm="4">
                            <v-img
                                style="background: #eee"
                                height="200"
                                contain
                                :src="meetup.imageSrc"/>
                        </v-col>
                        <v-col cols="12" sm="8">
                            <v-card-title>{{ meetup.title }}</v-card-title>
                            <v-card-text>{{ meetup.description }}</v-card-text>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Meetups',
    computed: {
        meetups() {
            return this.$store.state.meetups;
        },
    },
};
</script>

<style></style>
