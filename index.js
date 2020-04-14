require('dotenv').config()

let express = require('express')
let ejsLayouts = require('express-ejs-layouts')
let app = express();
let multer = require('multer')
let upload = multer({ dest: './uploads' })
let cloudinary = require('cloudinary')

app.set('view engine', 'ejs')
app.use(ejsLayouts)
cloudinary.config(process.env.CLOUDINARY_URL)
let imgUrl = cloudinary.url('pwnviyhlghchtkrdksdw', {width: 200, height: 200})

app.get('/', function(req, res) {
  res.render('index', {image: imgUrl});
});

app.post('/', upload.single('myFile'), (req, res) => {
	cloudinary.uploader.upload(req.file.path, (result) => {
		res.send(result)		
	})
})

app.listen(3000);
