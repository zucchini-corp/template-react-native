import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export const findAll = async <T>(
  transaction: FirebaseFirestoreTypes.Transaction,
  collectionPath: string,
  query: (
    _collection: FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>,
  ) => FirebaseFirestoreTypes.Query,
): Promise<T[]> => {
  const collection = firestore().collection(collectionPath);
  const dataList = (await query(collection).get()).docs.map(doc => {
    return {...doc.data(), fid: doc.id};
  });
  return dataList as T[];
};

export const findById = async <T>(
  transaction: FirebaseFirestoreTypes.Transaction,
  collectionPath: string,
  id: string,
): Promise<T> => {
  const collection = firestore().collection(collectionPath);
  const ref = collection.doc(id);
  const doc = await transaction.get(ref);
  return {...doc.data(), fid: doc.id} as T;
};

export const update = async <T extends FirebaseFirestoreTypes.DocumentData>(
  transaction:
    | FirebaseFirestoreTypes.Transaction
    | FirebaseFirestoreTypes.WriteBatch,
  collectionPath: string,
  data: T,
) => {
  const collection = firestore().collection(collectionPath);
  const ref = collection.doc(data.fid);
  transaction.set(ref, data);
  return {
    ...data,
    fid: ref.id,
  };
};

export const updateAll = async <T extends FirebaseFirestoreTypes.DocumentData>(
  batch: FirebaseFirestoreTypes.WriteBatch,
  collectionPath: string,
  dataList: T[],
) => {
  const collection = firestore().collection(collectionPath);
  const result: T[] = [];
  dataList.forEach(data => {
    const ref = collection.doc(data.fid);
    result.push({...data, fid: ref.id});
    batch.set(ref, data);
  });
  return result;
};

export const removeAll = async <T extends FirebaseFirestoreTypes.DocumentData>(
  batch: FirebaseFirestoreTypes.WriteBatch,
  collectionPath: string,
  dataList: T[],
) => {
  const collection = firestore().collection(collectionPath);
  const result: T[] = [];
  dataList.forEach(data => {
    const ref = collection.doc(data.fid);
    result.push({...data, fid: ref.id});
    batch.delete(ref);
  });
  return result;
};
