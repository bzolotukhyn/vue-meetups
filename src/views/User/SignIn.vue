<template>
    <v-container style="max-width: 750px">
        <v-form @submit.prevent="signIn">
            <v-row>
                <v-col>
                    <v-text-field label="Email" v-model="email" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        label="Password"
                        type="password"
                        v-model="password"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn class="primary" type="submit" block>Sign In</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: 'SignIn',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        signIn() {
            if (!/[^@]+@[^\\.]+\..+/.test(this.email)) {
                alert('Email is not valid');
            }
            this.$store.dispatch('signUserIn', {
                email: this.email,
                password: this.password,
            });
        },
    },
};
</script>

<style></style>
