<template>
    <v-container style="max-width: 750px">
        <v-form @submit.prevent="">
            <v-row>
                <v-col>
                    <v-text-field label="Email" v-model="email" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field label="Password" v-model="password" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        label="Password confirmation"
                        v-model="confirmPassword"/>
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
    name: 'SignUp',
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    watch: {
        user(value) {
            if (value !== null && value !== undefined) {
                this.$router.push('/');
            }
        },
    },
    methods: {
        onSignUp() {
            if (!/[^@]+@[^\\.]+\..+/.test(this.email)) {
                alert('Email is not valid');
            }
            if (this.password !== this.confirmPassword) {
                alert('Passwords are not equal');
            }
            this.$store.dispatch('signUserUp', {
                email: this.email,
                password: this.password,
            });
        },
    },
};
</script>

<style></style>
