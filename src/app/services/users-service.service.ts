import { Injectable } from '@angular/core';

@Injectable()
export class UsersServiceService {
  constructor() {}

  usersData = [
    {
      Occupation: 'Angular Developer',
      age: '27',
      firstName: 'vinay ',
      gender: 'Male',
      id: 13,
      img: 'https://randomuser.me/api/portraits/men/17.jpg',
      lastName: 'singh',
      location: 'Hyderabad'
    },
    {
      Occupation: 'Angular Developer',
      age: '27',
      firstName: 'Ramya ',
      gender: 'Female',
      id: 1,
      img: 'https://randomuser.me/api/portraits/women/17.jpg',
      lastName: 'Shree',
      location: 'Hyderabad'
    }
  ];
}
