import { CustomError } from '@blackglory/errors'

export class NotFound extends CustomError {
  constructor(namespace: string, id: string) {
    super(`The item in ${namespace}/${id} is not found`)
  }
}

export class IllegalIndex extends CustomError {
  constructor(namespace: string, id: string) {
    super(`The index of the event in ${namespace}/${id} is illegal`)
  }
}
