import faker from '@faker-js/faker'

import {School} from './school.model'

export const generateOneSchool = (): School => {
  return {
    _id:{
      $oid: faker.datatype.uuid()
    },
    nombre: faker.commerce.productName(),
    ubicacion: faker.address.city(),
    test: faker.random.boolean()
  }
}

export const generateManySchools = (size = 10): School[] => {
  const schools: School[] = [];
  for(let index = 0; index < size; index++) {
    schools.push(generateOneSchool());
  }
  return [ ...schools ];
}

