module.exports = {
    add_sql: function (table, field) {
        return `INSERT INTO ${table}(${field}) VALUES ?`;
    }
}