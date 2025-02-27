var express = require('express');
const Model_Kategori = require('../model/Model_Kategori');
var router = express.Router();

router.get('/', async (req, res, next) => {
    let rows = await Model_Kategori.getAll();
    return res.status(200).json({
        status: true,
        message: 'Data Kategori',
        data: rows
    })
})

router.post('/store', async (req, res, next) => {
    try {
        let {nama_kategori} = req.body;
        let Data = {
            nama_kategori
        }
        await Model_Kategori.Store(Data);
        return res.status(201).json({
            status: true,
            message: 'Data Kategori berhasil ditambahkan'
        })
    } catch (error) {
        return res.status(500).json({
            status: true,
            message: 'Terjadi kesalahan pada fungsi'
        })
    }
})

router.patch('/update/(:id)', async (req, res, next) => {
    try {
        let id = req.params.id;
        let {nama_kategori} = req.body;
        let Data = {
            nama_kategori
        }
        await Model_Kategori.Update(id, Data);
        return res.status(201).json({
            status: true,
            message: 'Data Kategori berhasil di perbarui'
        })
    } catch (error) {
        return res.status(500).json({
            status: true,
            message: 'Terjadi kesalahan pada router'
        })
    }
})

router.delete('/delete/(:id)', async (req, res, next) => {
    try {
        let id = req.params.id;
        await Model_Kategori.Delete(id);
        return res.status(201).json({
            status: true,
            message: 'Data Kategori berhasil di hapus'
        })
    } catch (error) {
        return res.status(500).json({
            status: true,
            message: 'Terjadi kesalahan pada router'
        })
    }
})

module.exports = router