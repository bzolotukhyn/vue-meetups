<template>
    <v-container style="max-width: 750px">
        <v-form @submit.prevent="createMeetup">
            <v-row>
                <v-col>
                    <v-sheet
                        class="pa-4 d-flex flex-row justify-center"
                        color="grey lighten-3">
                        <v-img
                            v-if="imageUrl"
                            :src="imageUrl"
                            max-width="90%"/>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-file-input
                        :rules="[
                            (value) =>
                                !value ||
                                value.size < 10000000 ||
                                'Avatar size should be less than 10 MB!',
                        ]"
                        label="File input"
                        accept="image/png, image/jpeg, image/bmp"
                        filled
                        prepend-icon="mdi-camera"
                        @change="onFilePicked"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field label="Title" v-model="title" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field label="Description" v-model="description" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field label="Location" v-model="location" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <DateInput v-model="date" :minDate="minDate" />
                </v-col>
                <v-col cols="12" sm="6">
                    <TimeInput v-model="time" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn class="primary" type="submit" block>Create</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
import TimeInput from '@/components/TimeInput';
import DateInput from '@/components/DateInput';

const minDate = new Date();
minDate.setDate(minDate.getDate() + 1);
minDate.setHours(10, 0, 0);
const splitDateStr = minDate.toISOString().split('T');
const minDateStr = splitDateStr[0];
export default {
    name: 'CreateMeetup',
    components: {
        TimeInput,
        DateInput,
    },
    data() {
        return {
            imageUrl: '',
            image: null,
            title: '',
            description: '',
            location: '',
            time: '10:00',
            date: minDateStr,
            minDate: minDateStr,
        };
    },
    methods: {
        async createMeetup() {
            const { title, description, location, image } = this;
            await this.$store.dispatch('createMeetup', {
                title,
                description,
                location,
                image,
                date: this.getISODateStr(),
            });
            this.$router.push({ name: 'Meetups' });
        },
        getISODateStr() {
            return new Date(`${this.date}T${this.time}`).toISOString();
        },
        onFilePicked(file) {
            if (!file) {
                this.imageUrl = '';
                this.image = null;
                return;
            }
            this.imageUrl = URL.createObjectURL(file);
            this.image = file;
        },
    },
};
</script>

<style></style>
