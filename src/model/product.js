const database = require('../config/databases')
const product = {}


product.GetAll = () => {
    return new Promise((resolve, reject) => { 
        database.query(`SELECT * FROM produk ORDER BY id ASC`)
        .then(res => {
            resolve(res.rows)
            if (res.rows == []){
                console.log('data tidak ada')
            }
        })
        .catch(err => {
            reject(err)
        })
    })
}

product.filter = (orderBy) => {
    return new Promise((resolve, reject) => {
        let query;
        if (orderBy == "id") {
            query = `SELECT * FROM produk ORDER BY id ASC`
        } else if (orderBy == "nama") {
            query = `SELECT * FROM public.produk ORDER BY nama ASC`
        } else if (orderBy == "latest") {
            query = `SELECT * FROM public.produk ORDER BY id DESC`
        } else {
            query = false
        }
        if (query != false) {
            database.query(query)
                .then(res => resolve(res.rows))
                .catch(err => reject(err))
        } else {
            resolve(false)
        }

    })
}

product.get = (id) => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM public.produk WHERE id=${id}`)
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

product.Lupdate = () => {
    return new Promise ((resolve, reject) => {
        database.query ('SELECT * FROM public.produk ORDER BY id DESC')
        .then(res => {
            resolve(res.rows)
        }) .catch(err => {
            reject(err)
        })
    })
}

product.Name = () => {
    return new Promise ((resolve, reject) => {
        database.query ('SELECT * FROM produk ORDER BY nama ASC')
        .then(res => {
            resolve(res.rows)
        }) .catch(err => {
            reject(err)
        })
    })
}

product.Price = () => {
    return new Promise ((resolve, reject) => {
        database.query ('SELECT * FROM public.produk ORDER BY harga ASC')
        .then(res => {
            resolve(res.rows)
        }) .catch(err => {
            reject(err)
        })
    })
}

product.Search = (name, sensitive = "false") => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM public.produk WHERE lower(nama) LIKE lower('${nama}%');`)
        if (sensitive == "false") {
            database.query(`SELECT * FROM produk WHERE lower(nama) LIKE lower('${nama}%');`)
                .then(res => resolve(res))
                .catch(err => reject(err))
        } else {
            database.query(`SELECT * FROM produk WHERE lower(nama) LIKE lower('%${nama}%');`)
                .then(res => resolve(res))
                .catch(err => reject(err))
        }
    })
}


product.Add = (data) => {
    return new Promise((resolve, reject) => {
    database.query(`INSERT INTO produk (nama, harga, stok, images) VALUES ('${data.nama}', '${data.harga}','${data.stok}', '${data.images} ')`)
        .then(res => {
            resolve(res)
            console.log(res)
        })
        .catch(err => {
            reject(err)
        })
    })
    
}


product.Edit = (data) => {
    return new Promise((resolve, reject) => {
    database
    .query(`UPDATE produk SET nama='${data.nama}', images='${data.images}', harga='${data.harga}', stok='${data.stok}' WHERE id = ${data.id} RETURNING *`)
    .then(res => {
        resolve(res.rows)
    })
    .catch(err => {
        reject(err)
    })
 })
}



product.Delete = (id) => {
    database.query(`DELETE FROM produk WHERE id = ${id};`)
    .then(res => {
        return res
    }) 
    .catch(err => {
        console.log(err)
        return err
    })
}


module.exports = product