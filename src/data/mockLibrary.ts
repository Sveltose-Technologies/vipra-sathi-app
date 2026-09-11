import { Stotram, Aarti } from '../types/library';

export const STOTRAM_CATEGORIES = [
  'All',
  'Vishnu Stotras',
  'Ganesh Stotras',
  'Shiva Stotras',
  'Durga Stotras',
  'Hanuman Stotras'
];

const DUMMY_AUDIO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export const MOCK_STOTRAS: Stotram[] = [
  {
    id: 's1',
    title: 'Sankat Nashan Stotram',
    category: 'Ganesh Stotras',
    audioUrl: DUMMY_AUDIO_URL,
    content: `Pranamya shirasa devam Gauri putram Vinayakam.
Bhavthavasam smare nityam ayuh kama artha sidhaye.
Prathamam Vakratundam cha, Ekadantam dwitiyakam.
Tritiyam Krishna Pingaksham, Gajavaktram Chaturthakam.
Lambodaram Panchamam cha, Shashtham Vikatameva cha.
Saptamam Vighna Rajam cha, Dhoomravarnam tathashtamam.
Navamam Bhalchandram cha, Dashamam tu Vinayakam.
Ekadasham Ganapatim, Dwadasham tu Gajananam.`
  },
  {
    id: 's2',
    title: 'Ganapati Atharvashirsha',
    category: 'Ganesh Stotras',
    audioUrl: DUMMY_AUDIO_URL,
    content: `Om Namaste Ganapataye.
Tvameva pratyaksham tattvamasi.
Tvameva kevalam kartasi.
Tvameva kevalam dhartasi.
Tvameva kevalam hartasi.
Tvameva sarvam khalvidam brahmasi.
Tvam sakshadatmasi nityam.`
  },
  {
    id: 's3',
    title: 'Ganesh Pancharatnam',
    category: 'Ganesh Stotras',
    audioUrl: DUMMY_AUDIO_URL,
    content: `Muda Karatta Modakam Sada Vimukti Sadhakam
Kala Dharavatamsakam Vilasi Loka Rakshakam
Anayakaika Nayakam Vinasitebha Daityakam
Natasubhasu Nasakam Namami Tham Vinayakam.`
  },
  {
    id: 's4',
    title: 'Vishnu Sahasranamam (Excerpt)',
    category: 'Vishnu Stotras',
    audioUrl: DUMMY_AUDIO_URL,
    content: `Shuklam-baradharam vishnum shashi-varnam chatur-bhujam
Prasanna-vadanam dhyayet sarva-vighnopa-shantaye
Vyasam vasishtha-naptaram shakteh pautram-akalmasham
Parasharatmajam vande shukatatam taponidhim`
  },
  {
    id: 's5',
    title: 'Ganesh Kavach',
    category: 'Ganesh Stotras',
    audioUrl: DUMMY_AUDIO_URL,
    content: `Esoumati prasarpaami kavacham sarvakaamikam.
Shrunu vakshyaami te devi kavacham sarvasiddhidam.
Ganeshou me shirah paatu, bhaalam paatu Gajaananah.`
  },
  {
    id: 's6',
    title: 'Vakratunda Mahakaya',
    category: 'Ganesh Stotras',
    audioUrl: DUMMY_AUDIO_URL,
    content: `Vakratunda Mahakaya,
Suryakoti Samaprabha,
Nirvighnam Kuru Me Deva,
Sarvakaryeshu Sarvada.`
  }
];

export const AARTI_CATEGORIES = [
  'All',
  'Ganesh Aarti',
  'Shiva Aarti',
  'Durga Aarti',
  'Lakshmi Aarti',
  'Hanuman Aarti'
];

export const MOCK_AARTIS: Aarti[] = [
  {
    id: 'a1',
    title: 'Jai Ganesh Deva',
    category: 'Ganesh Aarti',
    audioUrl: DUMMY_AUDIO_URL,
    imageUrl: 'https://images.unsplash.com/photo-1579564639904-e5357c9ee364?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    content: `Jai Ganesh Jai Ganesh,
Jai Ganesh Deva
Mata Jaki Parvati
Pita Mahadeva.

Ek Dant Dayavant,
Char Bhuja Dhari
Mathe Sindur Sohai,
Muse Ki Savari.

Andhan Ko Aankh Det,
Korthin Ko Kaya
Banjhan Ko Putra Det,
Nirdhan Ko Maya.

Pan Chadhe Phul Chadhe,
Aur Chadhe Meva
Ladduan Ka Bhog Lage,
Sant Kare Seva.

Din Ki Laaj Rakho,
Shambhu Sut Vari
Kamana Ko Purna Karo,
Jag Balihari.`
  },
  {
    id: 'a2',
    title: 'Om Jai Jagdish Hare',
    category: 'Vishnu Aarti',
    audioUrl: DUMMY_AUDIO_URL,
    imageUrl: 'https://images.unsplash.com/photo-1629532587783-a79fa4f519eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    content: `Om Jai Jagdish hare,
Swami Jai Jagdish hare,
Bhakt jano ke sankat,
Das jano ke sankat,
Kshan men dur kare,
Om Jai Jagdish hare.

Jo Dhyave Phal Pave,
Dukh Binse Man Ka,
Swami Dukh Binse Man Ka.
Sukh Sampati Ghar Ave,
Sukh Sampati Ghar Ave,
Kasht Mite Tan Ka,
Om Jai Jagdish hare.

Mata Pita Tum Mere,
Sharan Gahu Main Kiski,
Swami Sharan Gahu Main Kiski.
Tum Bin Aur Na Duja,
Tum Bin Aur Na Duja,
Aas Karun Jiski,
Om Jai Jagdish hare.`
  },
  {
    id: 'a3',
    title: 'Aarti Kije Hanuman Lala Ki',
    category: 'Hanuman Aarti',
    audioUrl: DUMMY_AUDIO_URL,
    imageUrl: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    content: `Aarti kije Hanuman lala ki,
Dusht dalan Raghunath kala ki.
Jake bal se girivar kanpe,
Rog dosh ja ke nikat na jhankhe.

Anjani putra Maha baldayi,
Santan ke prabhu sada sahayi.
De beera Raghunath pathaye,
Lanka jari siya sudi laye.

Lanka so kot samudra si khai,
Jat pavan sut bar na lai.
Lanka jari asur samhare,
Siyaramji ke kaj savare.`
  }
];
