import Cookies from 'js-cookie'

const StudentTokenKey = 'student-token'


export function getStudentToken() {
  return Cookies.get(StudentTokenKey)
}

export function setStudentToken(token) {
  return Cookies.set(StudentTokenKey, token)
}

export function removeStudentToken() {
  return Cookies.remove(StudentTokenKey)
}