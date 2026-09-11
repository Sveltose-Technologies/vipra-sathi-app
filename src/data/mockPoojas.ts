import { Pooja } from '../types/pooja';

export const CATEGORIES = [
  'All',
  'Vishnu Pooja',
  'Ganesh Pooja',
  'Shiva Pooja',
  'Durga Pooja',
  'Lakshmi Pooja',
  'Hanuman Pooja'
];

export const MOCK_POOJAS: Pooja[] = [
  {
    id: 'p1',
    title: 'Ganesh Chaturthi Pooja',
    category: 'Ganesh Pooja',
    subCategory: 'Shodashopchar Pooja',
    sections: [
      { sectionId: 's1', sectionType: 'Heading', content: 'Ganesh Chaturthi Special' },
      { sectionId: 's2', sectionType: 'Description', content: 'This pooja is performed to invoke the blessings of Lord Ganesha, the remover of obstacles.' },
      { sectionId: 's3', sectionType: 'Dhyan', content: 'Vakratunda Mahakaya Surya Koti Samaprabha\nNirvighnam Kuru Me Deva Sarva Karyeshu Sarvada' },
      { sectionId: 's4', sectionType: 'Heading', content: 'Main Mantra' },
      { sectionId: 's5', sectionType: 'Mantra', content: 'Om Gam Ganapataye Namaha' },
    ]
  },
  {
    id: 'p2',
    title: 'Satyanarayan Vrat Katha',
    category: 'Vishnu Pooja',
    subCategory: 'Panchopchar Pooja',
    sections: [
      { sectionId: 's1', sectionType: 'Heading', content: 'Satyanarayan Vrat' },
      { sectionId: 's2', sectionType: 'Description', content: 'Dedicated to Lord Vishnu in his manifestation as Lord Satyanarayan. Performed for prosperity and happiness.' },
      { sectionId: 's3', sectionType: 'Dhyan', content: 'Shantakaram Bhujagashayanam Padmanabham Suresham\nVishwadharam Gaganasadrisham Meghavarnam Shubhangam' },
      { sectionId: 's4', sectionType: 'Heading', content: 'Mantra' },
      { sectionId: 's5', sectionType: 'Mantra', content: 'Om Namo Bhagavate Vasudevaya' },
    ]
  },
  {
    id: 'p3',
    title: 'Maha Shivratri Pooja',
    category: 'Shiva Pooja',
    subCategory: 'Rajopchar Pooja',
    sections: [
      { sectionId: 's1', sectionType: 'Heading', content: 'Shivratri Rudrabhishek' },
      { sectionId: 's2', sectionType: 'Description', content: 'The great night of Shiva, involves offering Bael leaves, milk, and water to the Shiva Linga.' },
      { sectionId: 's3', sectionType: 'Mantra', content: 'Om Namah Shivaya' },
      { sectionId: 's4', sectionType: 'Mantra', content: 'Mahamrityunjaya Mantra: Om Tryambakam Yajamahe...' },
    ]
  }
];
