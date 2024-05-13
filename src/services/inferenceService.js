const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');
 
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = model.predict(tensor);
        const score = await prediction.data();

        const confidenceScore = Math.max(...score) * 100;
        let label = 'classes[classResult]';
 
        let suggestion;
 
        if(label) {
            label= 'Cancer';
            suggestion = "Segera konsultasi dengan dokter terdekat jika ukuran semakin membesar dengan cepat, mudah luka atau berdarah."
        }
        else {
            label = 'Non-cancer';
            suggestion = "Tidak ada saran khusus. Anda sehat.";
        }
 
        return { confidenceScore, label, suggestion };
    } catch (error) {
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi')
    }
}
 
module.exports = predictClassification;