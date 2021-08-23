/* eslint-disable import/no-anonymous-default-export */
export default {
  handle(TOKEN) {
    this.set(TOKEN);
  },
  set(TOKEN) {
    localStorage.setItem('token', TOKEN);
  },
  get() {
    return localStorage.getItem('token');
  },
  delete() {
    return localStorage.removeItem('token');
  },
  setUserIsMobile() {
    return localStorage.setItem('userMobile', false)
  },
  getUserIsMobile() {
    return localStorage.getItem('userMobile')
  },
  setUserInfo(id=null, firstName=null, lastName=null, email=null, name=null) {
    let user = {
        'id': id,
        'name': name,
        'firstName': firstName,
        'lastName': lastName,
        'email': email
    }
    localStorage.setItem('user', JSON.stringify(user));
  },
  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  },
};
