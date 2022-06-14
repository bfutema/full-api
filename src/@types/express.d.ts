declare namespace Express {
  declare namespace Multer {
    export interface File {
      key: string;
      location: string;
    }
  }

  export interface Request {
    user: {
      id: string;
      name: string;
      email: string;
      // claims: any[];
    };

    file: Multer.File;
  }
}
