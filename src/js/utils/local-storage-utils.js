export function getToken() {
  return localStorage.getItem('jwt');
}

export function saveToken(token) {
  localStorage.setItem('jwt', token);
}

export function deleteToken() {
  localStorage.removeItem('jwt');
}
