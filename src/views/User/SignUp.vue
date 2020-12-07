<template>
    <v-row justify="center">
        <v-col cols="12">
            <v-card max-width="400" class="mx-auto my-12">
                <v-card-text>
                    <form @submit.prevent="onSignUp">
                        <v-text-field
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            required
                            v-model="email"/>
                        <v-text-field
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            required
                            v-model="password"/>
                        <v-text-field
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm password"
                            type="password"
                            required
                            v-model="confirmPassword"/>
                        <v-btn class="primary" block type="submit">
                            Sign Up
                        </v-btn>
                    </form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import * as firebase from 'firebase';
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
        isPasswordValid() {
            return this.password !== this.confirmPassword;
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
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then((userCredential) => {
                    this.$root.user = userCredential.user.uid;
                    console.log(userCredential.user.uid);
                });
        },
    },
};
</script>

<style></style>
