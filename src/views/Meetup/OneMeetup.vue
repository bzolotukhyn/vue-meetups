<template>
    <v-container v-if="meetup">
        <v-row>
            <v-col>
                <v-img :src="meetup.imageSrc" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn
                    v-if="isUserRegistered"
                    class="primary"
                    @click="unregister()">
                    Unregister
                </v-btn>
                <v-btn v-else class="primary" @click="register">Register</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h1>{{ meetup.title }}</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <i>{{ dateStr }}</i>
                ,
                <b>{{ meetup.location }}</b>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <p>{{ meetup.description }}</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Meetup',
    props: ['id'],
    computed: {
        meetups() {
            return this.$store.state.meetups;
        },
        registrations() {
            return this.$store.getters.registrations;
        },
        isUserRegistered() {
            return this.registrations.includes(this.id);
        },
        meetup() {
            return this.meetups.find(({ id }) => this.id === id);
        },
        dateStr() {
            return new Date(this.meetup.date).toLocaleString();
        },
    },
    methods: {
        register() {
            this.$store.dispatch('registerAtMeetup', {
                meetupId: this.meetup.id,
            });
        },
        unregister() {
            this.$store.dispatch('unregisterAtMeetup', {
                meetupId: this.meetup.id,
            });
        },
    },
};
</script>

<style></style>
