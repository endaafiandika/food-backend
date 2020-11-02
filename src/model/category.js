const database = require('../config/databases')
const category = {}

category.all = () => {
    return new Promise ((resolve, reject) => {
        database.query("SELECT * FROM kategori")
        .then((res) => {
            resolve(res.rows)
        }).catch((err) => {
            reject(err)
        });
    })
}

category.add = (name_produk, type) => {
    return new Promise ((resolve, reject) => {
        database.query(`INSERT INTO kategori (name_produk, type) VALUES ('${name_produk}', '${type}')`)
        .then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        });
    })
}

category.Edit = (id_kategori, name_produk, type) => {
    return new Promise ((resolve, reject) => {
        database.query(`UPDATE public.kategori SET name_produk='${name_produk}', type='${type}' WHERE id_kategori = ${id_kategori}`)
        .then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        });
    })
}

category.delete = (id_kategori) => {
    return new Promise ((resolve, reject) => {
        database.query(`DELETE FROM category WHERE id_kategori = ${id_kategori};`)
        .then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        });
    })
}




module.exports = category