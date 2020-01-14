// @ts-ignore
import faker from 'faker';


const COLOR_ONLY: string[] = [ "red", "blue", "yellow", "purple", "green", "pink", "orange", "brown" ];

/*******************************/

export interface ITableEmployers {
  id: number,
  name: string,
  surname: string,
  days: number,
  pay: number
}

const TABLE_FIELDS: string[] = [ "id", "Имя", "Фамилия", "Дней отработано", "Ставка за день", "Зарплата работника" ];
const TABLE_EMPLOYERS: ITableEmployers[] = [];

let count: number = 10;
while (count) {
  TABLE_EMPLOYERS.push({ id: count, name: faker.name.firstName(), surname: faker.name.lastName(), days: faker.random.number(30), pay: faker.random.number(300) });
  
  count--;
}

/*******************************/

export {
  COLOR_ONLY,
  TABLE_FIELDS,
  TABLE_EMPLOYERS
};
