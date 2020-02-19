import Dexie from 'dexie';

export interface Signature {
  date: string;
  in?: number;
  out?: number;
}

type SignatureUpdatesObject = Omit<Signature, 'date'>;

class SigningDatabase extends Dexie {
  signings: Dexie.Table<Signature, string>;

  constructor() {
    super('SigningDatabase');
    this.version(1).stores({
      signings: 'date',
    });

    this.signings = this.table('signings');
  }
}

const db = new SigningDatabase();

db.version(1).stores({
  signings: 'date',
});

// Constrains

const checkSigns = (
  updates: SignatureUpdatesObject,
  signature: Signature,
) => {
  let err = false;
  if (updates.in && updates.out) {
    if (updates.in > updates.out) {
      err = true;
    }
  } else if (
    updates.in &&
    signature.out &&
    updates.in > signature.out
  ) {
    err = true;
  } else if (
    signature.in &&
    updates.out &&
    signature.in > updates.out
  ) {
    err = true;
  }

  if (err) {
    throw new Error(
      'La hora de llegada es superior a la hora de salida.',
    );
  }
};

db.signings.hook('updating', (updates, _, signature) => {
  checkSigns(updates, signature);
});

export default db;
