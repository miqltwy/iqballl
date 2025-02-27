const connection = require('../config/db');

class Model_Produk {
    static async getAll(){
        return new Promise((resolve, reject)=> {
            connection.query(`SELECT * FROM produk a LEFT JOIN kategori b ON b.id_kategori = a.id_kategori ORDER BY a.id desc`, (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    };

    static async Store(Data){
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO produk SET ? `, Data,  (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }

    static async getId(Id){
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM produk a LEFT JOIN kategori b ON b.id_kategori = a.id_kategori WHERE a.id =  ` + Id,  (err, rows) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    }

    static async Update(Id, Data){
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE produk SET ? WHERE id = ` + Id, Data,  (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }

    static async Delete(Id){
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM produk WHERE id = ` + Id,  (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }

}

module.exports = Model_Produk;