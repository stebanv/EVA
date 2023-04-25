import faker from '@faker-js/faker'

import {Student} from './student.model'

export const generateOneStudent = (): Student => {
  return {
    _id:{
      $oid: faker.datatype.uuid()
    },
    nombre: faker.commerce.productName(),
    apellido: faker.commerce.productName(),
    curso: faker.commerce.price(),
    grado: faker.commerce.price(),
  }
}

export const generateManyStudents = (size = 10): Student[] => {
  const students: Student[] = [];
  for(let index = 0; index < size; index++) {
    students.push(generateOneStudent());
  }
  return [ ...students ];
}
