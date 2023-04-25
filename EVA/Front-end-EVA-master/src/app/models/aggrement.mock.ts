import faker from '@faker-js/faker'

import {Aggrement} from './aggrement.model'

export const generateOneAggrement = (): Aggrement => {
  return {
    _id:{
      $oid: faker.datatype.uuid()
    },
    nombre: faker.commerce.productName(),
    descripcion: faker.commerce.productDescription(),
    horario : faker.datatype.string(),
    area: faker.datatype.string(),
    subarea: faker.datatype.string(),
    costo: faker.datatype.number(),
    recursos: faker.datatype.string(),
    frecuencia: faker.datatype.string(),
    temporada: faker.datatype.string(),
    ubicacion: faker.address.direction(),
  }
}

export const generateManyAggrements = (size = 10): Aggrement[] => {
  const aggrement: Aggrement[] = [];
  for(let index = 0; index < size; index++) {
    aggrement.push(generateOneAggrement());
  }
  return [ ...aggrement ];
}
