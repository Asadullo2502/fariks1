const {Router} = require('express')
const router = Router()
const Jimp = require('jimp')

router.get('/', (req, res)=> {
    try{
        res.render('index')
    }catch(err) {
        console.log(err)
    }
})

router.post('/', async (req, res)=>{
    try{
        let imgRaw = 'public/raw/fariks.jpg'
        let imgActive = 'public/active/fariks.jpg'
        let imgExported = 'public/export/image.jpg'

        let textData = {
            text: `${req.body.name}`.toUpperCase(),
            maxWidth: 1920,
            maxHeight: 1080,
            placementX: 10,
            placementY: 540

        }

        const clone = await Jimp.read(imgRaw)
        await clone.clone().write(imgActive)

        const active = await Jimp.read(imgActive)

        const font = await Jimp.loadFont('./public/fonts/Poppins-Black.ttf.fnt')

        const image = await active.print(font, textData.placementX, textData.placementY, {
            text: textData.text,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
        }, textData.maxWidth)

        await image.quality(100).write(imgExported)

        res.redirect('/success')
    }catch(err){
        console.log(err)
    }
})

router.get('/success', (req, res) => {
    try {
        res.render('success')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
