import { ISiteJson } from 'src/app/interfaces/isite-json';

export const MokSitesJSon: ISiteJson[] = [
  {
    siteId: 2,
    name: ' אפקון תגבור',
    address: 'אלכסנדר ינאי 1',
    // watchStrArr: [
    //   '-06:00+12;18:00+12',
    //   '-06:00+12;18:00+12',
    //   '-06:00+12;18:00+12',
    //   '-06:00+12;18:00+12',
    //   '-06:00+12;18:00+12',
    //   '06:00+12;18:00+12',
    //   '06:00+12;18:00+12',
    // ],
    watchPlan: [
      [-6.0, 18.0],
      [-6.0, 18.0],
      [-6.0, 18.0],
      [-6.0, 18.0],
      [-6.0, 18.0],
      [6.0, 18.0],
      [6.0, 18.0],
    ],
  },
  {
    siteId: 3,
    name: 'בית הםפר',
    address: 'צהל 71 פתח תיקוה',
    watchPlan: [
      [-7.0, 15.0, 23.0],
      [-7.0, 15.0, 23.0],
      [-7.0, 15.0, 23.0],
      [-7.0, 15.0, 23.0],
      [-7.0, 15.0, 23.0],
      [-7.0, -15.0, -23.0],
      [-7.0, -15.0, -23.0],
    ],
    // watchStrArr: [
    //   '-07:00+8;15:00+8;23:00+8',
    //   '-07:00+8;15:00+8;23:00+8',
    //   '-07:00+8;15:00+8;23:00+8',
    //   '-07:00+8;15:00+8;23:00+8',
    //   '-07:00+8;15:00+8;23:00+8',
    //   '-07:00+8;-15:00+8;-23:00+8',
    //   '-07:00+8;-15:00+8;-23:00+8',
    // ],
  },
  {
    siteId: 6,
    name: 'כניסה ספקים',
    address: 'סמתה תבור 4',
    watchPlan: [
      [6.0, 14.0, 22.0],
      [6.0, 14.0, 22.0],
      [6.0, 14.0, 22.0],
      [6.0, 14.0, 22.0],
      [6.0, 14.0, 22.0],
      [6.0, 14.0, 22.0],
      [6.0, 14.0, 22.0],
    ],
    // watchStrArr: [
    //   '06:00+8;14:00+8;22:00+8',
    //   '06:00+8;14:00+8;22:00+8',
    //   '06:00+8;14:00+8;22:00+8',
    //   '06:00+8;14:00+8;22:00+8',
    //   '06:00+8;14:00+8;22:00+8',
    //   '06:00+8;14:00+8;22:00+8',
    //   '06:00+8;14:00+8;22:00+8',
    // ],
  },
  {
    siteId: 9,
    name: 'עץ הזית',
    address: 'ישראל פוקס 1',
    watchPlan: [
      [6.5, 14.5, 22.5],
      [6.5, 14.5, 22.5],
      [6.5, 14.5, 22.5],
      [6.5, 14.5, 22.5],
      [6.5, 14.5, 22.5],
      [6.5, 14.5, 22.5],
      [6.5, 14.5, 22.5],
    ]
    // watchStrArr: [
    //   '06:30+8;14:30+8;22:30+8',
    //   '06:30+8;14:30+8;22:30+8',
    //   '06:30+8;14:30+8;22:30+8',
    //   '06:30+8;14:30+8;22:30+8',
    //   '06:30+8;14:30+8;22:30+8',
    //   '06:30+8;14:30+8;22:30+8',
    //   '06:30+8;14:30+8;22:30+8',
    // ],
  },
];

// export const MokSitesJSon = [
//     {
//         "siteId": 2,
//         "name": " אפקון תגבור",
//         "address": "אלכסנדר ינאי 1",
//         "watchStrArr": [
//             "-06:00+12;18:00+12",
//             "-06:00+12;18:00+12",
//             "-06:00+12;18:00+12",
//             "-06:00+12;18:00+12",
//             "-06:00+12;18:00+12",
//             "06:00+12;18:00+12",
//             "06:00+12;18:00+12"
//         ],
//         watchPlan[
//             [-6.0,18.0],
//             [-6.0,18.0],
//             [-6.0,18.0],
//             [-6.0,18.0],
//             [-6.0,18.0],
//             [6.0,18.0],
//             [6.0,18.0]
//         ]

//     },
//     {
//         "siteId": 3,
//         "name": "בית הםפר",
//         "address": "צהל 71 פתח תיקוה",
//         "watchStrArr":
//             [
//                 "-07:00+8;15:00+8;23:00+8",
//                 "-07:00+8;15:00+8;23:00+8",
//                 "-07:00+8;15:00+8;23:00+8",
//                 "-07:00+8;15:00+8;23:00+8",
//                 "-07:00+8;15:00+8;23:00+8",
//                 "-07:00+8;-15:00+8;-23:00+8",
//                 "-07:00+8;-15:00+8;-23:00+8"

//             ]
//     },
//     {
//         "siteId": 6,
//         "name": "כניסה ספקים",
//         "address": "סמתה תבור 4",
//         "watchStrArr": [
//             "06:00+8;14:00+8;22:00+8",
//             "06:00+8;14:00+8;22:00+8",
//             "06:00+8;14:00+8;22:00+8",
//             "06:00+8;14:00+8;22:00+8",
//             "06:00+8;14:00+8;22:00+8",
//             "06:00+8;14:00+8;22:00+8",
//             "06:00+8;14:00+8;22:00+8"
//         ]
//     },
//     {
//         "siteId": 7,
//         "name": "ליבוי",
//         "address": "???????",
//         "watchStrArr": [
//             "07:00+8;15:00+8;23:00+8",
//             "07:00+8;15:00+8;23:00+8",
//             "07:00+8;15:00+8;23:00+8",
//             "07:00+8;15:00+8;23:00+8",
//             "07:00+8;15:00+8;23:00+8",
//             "07:00+8;15:00+8;23:00+8",
//             "07:00+8;15:00+8;23:00+8"

//         ]
//     },
//     {
//         "siteId": 9,
//         "name": "עץ הזית",
//         "address": "ישראל פוקס 1",
//         "watchStrArr": [
//             "06:30+8;14:30+8;22:30+8",
//             "06:30+8;14:30+8;22:30+8",
//             "06:30+8;14:30+8;22:30+8",
//             "06:30+8;14:30+8;22:30+8",
//             "06:30+8;14:30+8;22:30+8",
//             "06:30+8;14:30+8;22:30+8",
//             "06:30+8;14:30+8;22:30+8"

//         ]
//     },
//     {
//         "siteId": 10,
//         "name": "עקובי",
//         "address": "אפעל 29",
//         "watchStrArr": [
//             "-07:00+8;15:00+8;23:00+8",
//             "-07:00+8;15:00+8;23:00+8",
//             "-07:00+8;15:00+8;23:00+8",
//             "-07:00+8;15:00+8;23:00+8",
//             "-07:00+8;15:00+8;23:00+8",
//             "-07:00+8;15:00+8;23:00+8",
//             "07:00+8;15:00+8;23:00+8"

//         ]

//     },
//     {
//         "siteId": 11,
//         "name": "פרימיום סמלות",
//         "address": "גיסין 98 פתח תקוה",
//         "watchStrArr": [
//             "07:00+8;15:00+8;23:00+8",
//             "07:00+8;15:00+8;23:00+8",
//             "07:00+8;15:00+8;23:00+8",
//             "07:00+8;15:00+8;23:00+8",
//             "07:00+8;15:00+8;23:00+8",
//             "07:00+8;15:00+8;23:00+8",
//             "07:00+8;15:00+8;23:00+8"

//         ]
//     },

//     // {
//     //     "siteId": -1,
//     //     "name": "חופש מחלה",
//     //     "address": "",
//     //     "watchStrArr": []

//     // } ,
//     // {
//     //     "siteId": -1,
//     //     "name": "מחלה",
//     //     "address": "",
//     //     "watchStrArr": []

//     // }
// ];
