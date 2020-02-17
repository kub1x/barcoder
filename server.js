const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const JsBarcode = require('jsbarcode');
const { createCanvas } = require('canvas');

async function generateBarcode({ ean, format }) {
  const canvas = createCanvas(500, 1000);
  await JsBarcode(canvas, ean, { format });
  return canvas;
};

app.get('/:ean.png', async (req, res) => {
  const { ean } = req.params;
  console.log('-- generating barcode for ean: ' + ean);

  const canvas = await (generateBarcode({ ean, format: "EAN13" })
           .catch(() => generateBarcode({ ean, format: "EAN8" }))
           .catch(() => generateBarcode({ ean, format: "CODE128" })));

  const mimeType = 'image/png';
  const resultBuffer = canvas.toBuffer(mimeType);
  res.writeHead(200, {'Content-Type': mimeType});
  res.end(resultBuffer, 'binary');
})

app.listen(PORT, () => console.log(`Barcode listening on port ${PORT}!`))
