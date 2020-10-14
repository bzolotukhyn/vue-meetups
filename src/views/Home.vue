<template>
    <v-container>
        <v-row>
            <v-col class="text-sm-right text-center" cols="12" sm="6">
                <v-btn class="accent" large>Explore meetups</v-btn>
            </v-col>
            <v-col class="text-sm-left text-center" cols="12" sm="6">
                <v-btn class="accent" large>Organize meetup</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-carousel v-model="currentSlide">
                <v-carousel-item
                    v-for="(meetup, i) in meetups"
                    :key="meetup.id">
                    <v-sheet :color="meetup.imageURL" height="100%" tile>
                        <v-row
                            class="fill-height"
                            align="center"
                            justify="center">
                            <div class="text-h2">Slide {{ i + 1 }}</div>
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'Home',
    data: () => ({
        meetups: [
            { imageURL: 'primary', title: 'Meetup1', id: '123' },
            { imageURL: 'secondary', title: 'Meetup12', id: '321' },
        ],
        currentSlide: 0,
    }),
};
</script>

<style></style>
