const connection = require('../config/db');

class Model_Kategori {
    static async getAll(){
        return new Promise((resolve, reject)=> {
            connection.query(`SELECT * FROM kategori ORDER BY id_kategori desc`, (err, rows) => {
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
            connection.query(`INSERT INTO kategori SET ? `, Data,  (err, result) => {
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
            connection.query(`SELECT * FROM kategori WHERE id_kategori =  ` + Id,  (err, rows) => {
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
            connection.query(`UPDATE kategori SET ? WHERE id_kategori = ` + Id, Data,  (err, result) => {
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
            connection.query(`DELETE FROM kategori WHERE id_kategori = ` + Id,  (err, result) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }

}

module.exports = Model_Kategori;