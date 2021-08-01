export default function ({
    app,
    redirect,
    $auth
}) {
    if (!$auth.loggedIn) {
         redirect('/login');
         return;
    }
}