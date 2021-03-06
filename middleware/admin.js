export default function({ store, redirect }) {
  if (!store.state.auth.user) {
    return redirect('/login')
  } else if (!store.state.auth.user.isAdmin) {
    return redirect('/my')
  }
}
