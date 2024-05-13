const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
  console.log('TES MASUK storeData');
  const db = new Firestore();
  console.log('Buat Firestore');

  const predictCollection = db.collection('prediction');
  console.log('Buat koleksi prediction');
  console.log(predictCollection.doc(id).set(data));
  return predictCollection.doc(id).set(data);
}

module.exports = storeData;
