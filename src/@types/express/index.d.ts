declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    headers: {
      authorization: string;
    };
    user: {
      id: string;
    };
  }
}
// declare global {
//   namespace Express {
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     interface Request {
//       user: { id: string };
//     }
//   }
// }
// declare namespace Express {
//   interface Request {
//     user: {
//       id: string;
//     };
//   }
// }
// declare global {
//   namespace Express {
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     interface Request {
//       currentUser: UserModel;
//     }
//   }
// }
