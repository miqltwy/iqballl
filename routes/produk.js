var express = require('express');
const Model_Produk = require('../model/Model_Produk');
var router = express.Router();

const fs = require('fs');
const multer = require('multer');
const path = require ('path');
const { error } = require('console');

const limits = { fileSize: 1 * 1024 * 1024 };
const fileFilter  = (req, file, cb) => {
    if(!file.mimetype.startWith('image/')){
        return cb(new Error('Only image files are allowed'));
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage, limits, fileFilter});

router.get('/', async (req, res, next) => {
    let rows = await Model_Produk.getAll();
    return res.status(200).json({
        status: true,
        message: 'Data Produk',
        data: rows
    })
})

router.get('/(:id)', async (req, res, next) => {
    let id = req.params.id;
    let rows = await Model_Produk.getId(id);
    return res.status(200).json({
        status: true,
        message: 'Data Produk',
        data: rows
    })
})

router.post('/store', upload.single("gambar_produk"), async (req, res, next) => {
    try {
        if(!req.file){
            console.log('Ga Bisa Bos');
        }
        let {nama_produk, id_kategori} = req.body;
        let Data = {
            nama_produk, 
            gambar_produk : req.file.filename,
            id_kategori
        }
        await Model_Produk.Store(Data);
        return res.status(201).json({
            status: true,
            message: 'Produk Berhasil Ditambahkan'
        })
    } catch (error) {
        return res.status(500).json({
            status: true,
            message: 'Terjadi Kesalahan Pada Router'
        })
    }
})

router.patch('/update/(:id)', upload.single("gambar_produk"), async (req, res, next) => {
    try {
        let id = req.params.id;
        let {nama_produk, id_kategori} = req.body;
        let gambar = req.file ? req.file.filename : null;
        let rows = await Model_Produk.getId(id);
        const fileold = rows[0].gambar_produk;
        if(gambar && fileold){
            const pathfile = path.join(__dirname, '../public/images', fileold);
            fs.unlinkSync(pathfile);
        }
        let gambar_produk = gambar || fileold;
        let Data = {
            nama_produk,
            gambar_produk,
            id_kategori
        }
        await Model_Produk.Update(id, Data);
        return res.status(201).json({
            status: true,
            message: 'Data Produk berhasil diperbaharui',
        })
    } catch (error) {
        return res.status(500).json({
            status: true,
            message: 'Terjadi Kesalahan Pada Router'
        })
    }
})

router.delete('/delete/(:id)', async (req, res, next) => {
    try {
        let id = req.params.id;
        let rows = await Model_Produk.getId(id);
        const fileold = rows[0].gambar_produk;
        if(fileold){
            const pathfile = path.join(__dirname, '../public/images', fileold);
            fs.unlinkSync(pathfile);
        }
        await Model_Produk.Delete(id);
        return res.status(201).json({
            status: true,
            message: 'Data Produk berhasil dihapus',
        })
    } catch (error) {
        return res.status(500).json({
            status: true,
            message: 'Terjadi kesalahan pada router',
        })
    }
})

module.exports = router;