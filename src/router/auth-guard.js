export default function (to, from, next) {
    if (window) {
        next();
    } else {
        next({ name: 'SignIn' });
    }
}
