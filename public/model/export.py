import tensorflowjs as tfjs
import tensorflow as tf

model = tf.keras.models.load_model("public/model/py-model.keras")

tfjs.converters.save_keras_model(model, "public/model/")