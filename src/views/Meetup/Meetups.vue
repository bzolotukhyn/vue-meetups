<template>
    <div>
        <v-row>
            <v-col>
                <v-card elevation="5">
                    <v-row>
                        <v-col cols="12" sm="5">
                            <v-img
                                height="250"
                                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"/>
                        </v-col>
                        <v-col cols="12" sm="7">
                            <v-card-title>Meetup title</v-card-title>
                            <v-card-text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Fusce sit amet mauris eu eros
                                porttitor varius. Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Fusce ultrices nunc
                                id quam vestibulum, et finibus magna imperdiet.
                                Duis ac blandit quam. Phasellus tincidunt a
                                massa sed porttitor. Pellentesque magna velit,
                                scelerisque et auctor nec, malesuada eu erat.
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'Meetups',
};
</script>

<style></style>
