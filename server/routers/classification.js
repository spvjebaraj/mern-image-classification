const express = require("express");
const formidable = require("formidable");
const auth = require("../middleware/auth");
const Classification = require("../models/classification");

const image = require("get-image-data");
const tfcore = require("@tensorflow/tfjs-node");
const tf = require("@tensorflow/tfjs");
const mobilenet = require("@tensorflow-models/mobilenet");

const router = express.Router();

router.post("/image", auth, (req, res) => {
  let form = new formidable.IncomingForm({
    maxFileSize: 10485760, //10MB
  });

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).send("Something went wrong during upload.");
      } else {
        getClassification(files.image.path)
          .then((imageClassification) => {
            const data = [];

            imageClassification.forEach((item) => {
              data.push({
                class_name: item.className,
                probability: item.probability,
                probability_percent: item.probability * 100 + "%",
              });
            });

            const imageData = new Classification({
              image_url: files.image.path,
              classification: data,
              user_id: req.user._id,
            });
            imageData.save().then(() => {
              res.status(200).send({
                classification: imageClassification,
              });
            });
          })
          .catch((err) => {
            res.status(500).send("Something went wrong while fetching image.");
          });
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/imageurl", auth, async (req, res) => {
  getClassification(req.body.url)
    .then((imageClassification) => {
      const data = [];

      imageClassification.forEach((item) => {
        data.push({
          class_name: item.className,
          probability: item.probability,
          probability_percent: item.probability * 100 + "%",
        });
      });

      const imageData = new Classification({
        image_url: req.body.url,
        classification: data,
        user_id: req.user._id,
      });
      imageData.save().then(() => {
        res.status(200).send({
          classification: imageClassification,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send("Something went wrong while fetching image from URL.");
    });
});

function getClassification(url) {
  return new Promise((resolve, reject) => {
    image(url, async (err, image) => {
      if (err) {
        reject(err);
      } else {
        try {
          const channelCount = 3;
          const pixelCount = image.width * image.height;
          const vals = new Int32Array(pixelCount * channelCount);

          let pixels = image.data;
          for (let i = 0; i < pixelCount; i++) {
            for (let k = 0; k < channelCount; k++) {
              vals[i * channelCount + k] = pixels[i * 4 + k];
            }
          }

          const outputShape = [image.height, image.width, channelCount];
          const input = tf.tensor3d(vals, outputShape, "int32");
          const model = await mobilenet.load();

          let temp = await model.classify(input);
          resolve(temp);
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}

module.exports = router;
