const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const JsBarcode = require('jsbarcode');
const { createCanvas } = require('canvas');

app.get('/:ean.png', (req, res) => {
  const canvas = createCanvas(500, 1000);
  const { ean } = req.params;
  console.log('-- generating barcode for ean: ' + ean);
  try {
    JsBarcode(canvas, ean, { format:"EAN13" });
  } catch (e) {
    JsBarcode(canvas, ean, { format:"EAN8" });
  }
  const mimeType = 'image/png';
  const resultBuffer = canvas.toBuffer(mimeType);
  res.writeHead(200, {'Content-Type': mimeType});
  res.end(resultBuffer, 'binary');
})

app.listen(PORT, () => console.log(`Barcode listening on port ${PORT}!`))
