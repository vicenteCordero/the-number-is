import * as tf from '@tensorflow/tfjs';


export async function loadModel() {
    const model = await tf.loadLayersModel("/model/model.json");
    return model;
}

export async function predict(cellState) {
    const model = await loadModel();
    const inputTensor = tf.tensor(cellState).reshape([1, 28, 28, 1]);
    const prediction = model.predict(inputTensor);
    const predictedClass = prediction.argMax(-1).dataSync()[0]; // Get the index of the highest probability
    return predictedClass;
}