export default function({ store, redirect }) {
  if (!store.state.auth.user) {
    // TODO: fix this so on load the user data can be used
    return redirect('/');
  }
}
