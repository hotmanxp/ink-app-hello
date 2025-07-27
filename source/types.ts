export type FormData = {
  name: string
  email: string
  age: string
  department: string
  experience: string
}

export type FormErrors = {
  name?: string
  email?: string
  age?: string
  department?: string
  experience?: string
}

export type SelectItem = {
  label: string
  value: string
}

export type User = FormData & {
  id: string
  createdAt: string
}

export type Route = 'home' | 'form' | 'users' | 'edit-user'
