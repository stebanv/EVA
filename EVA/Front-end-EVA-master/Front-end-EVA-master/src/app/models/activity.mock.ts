import faker from '@faker-js/faker'

import {Activity} from './activity.model'

export const generateOneActivity = (): Activity => {
  return {
    _id:{
      $oid: faker.datatype.uuid()
    },
    nombre: faker.commerce.productName(),
    descripcion: faker.commerce.productDescription(),
    horario : faker.datatype.string(),
    area: faker.datatype.string(),
    subarea: faker.datatype.string(),
    cupos: faker.datatype.number(),
    recursos: faker.datatype.string(),
  }
}

export const generateManyActivitys = (size = 10): Activity[] => {
  const activities: Activity[] = [];
  for(let index = 0; index < size; index++) {
    activities.push(generateOneActivity());
  }
  return [ ...activities ];
}
