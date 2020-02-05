import Dexie from "dexie";

export interface Signature {
  date: string;
  in?: Date;
  out?: Date;
}

class SigningDatabase extends Dexie {
  signings: Dexie.Table<Signature, string>;

  constructor() {
    super("SigningDatabase");
    this.version(1).stores({
      signings: "date"
    });

    this.signings = this.table("signings");
  }
}

const db = new SigningDatabase();

db.version(1).stores({
  signings: "date"
});

export default db;
