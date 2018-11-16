const request = require('request');
const fs = require('fs');
let city = require('./config/city.js');
let mysql = require('mysql');
let sql_config = require('./config');
let operate = require('./sql_operate');


class portProxy {
    constructor () {
        this.proxy = [];
        this.options ={
            url: 'http://dps.kuaidaili.com/api/getdps/',
            method: 'GET',
            qs: {
                orderid: '990866563045611',
                num: '100',
                ut: '1',
                // dedup: '1',
                format: 'json',
                sep: '1'
            },
            headers: {
                'Connection': 'keep-alive',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'
            },
            json: true
        }
    }

    getIp () {
        request(this.options, (err, res, body) => {
            this.proxy = body.data.proxy_list.map(item => 'http://' + item);
            // _fetch_hospital.start('first')
            _fetch_lg.start();
        });
    }

    updateIp () {
        request(this.options, (error, response, body) => {
          this.proxy = body.data.proxy_list.map((item, index) => item = 'http://' + item)
        })
    }
}

class Fetch_lg {
    constructor () {
        this.list = [];
        this.requestNo = 0;
        this.options = {
            method: 'GET',
            url: 'http://m.soyoung.com/calendardoctor/getdoc',
            qs: {
                index: 0
            },
            timeout: 5000,
            proxy: '',
            headers: {
                'Connection': 'keep-alive',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            json: true
        }
    }

    start () {
        this.options.proxy = _portProxy.proxy[0]
        _portProxy.proxy.shift()
        this.requestNo++;
        request(this.options, (err, res, body) => {
            console.log(body)
            // if (body) {
            //     let {result} = body.content.data.page;
            //     this.options.qs.pageNo++;
            //     console.log('========================================start=========================================');
            //     console.log('*************请求IP:', this.options.proxy);
            //     result.map(item => {
            //         console.log('**************职位名称：', item.positionName);
            //         this.list.push({
            //             positionId: item.positionId,
            //             positionName: item.positionName,
            //             city: item.city,
            //             createTime: item.createTime,
            //             salary: item.salary,
            //             companyId: item.companyId,
            //             companyName: item.companyName,
            //             companyFullName: item.companyFullName
            //         });
            //     });
            //     console.log('************本次请求长度:', result.length);
            //     console.log('************总长度:', this.list.length);
            //     console.log('==========================================end=========================================');
            //     // 每个IP请求次数
            //     if (this.requestNo > 10) {
            //         // 请求次数置空
            //         this.requestNo = 0
            //         // 刷新IP
            //         _portProxy.updateIp()
            //         // 替换IP
            //         this.options.proxy = _portProxy.proxy[0]
            //     }
            //     if (this.options.qs.pageNo < 5) {
            //         this.start();
            //     } else {
            //         let connection = mysql.createConnection(sql_config.sql('test'));
            //         connection.connect();
            //         connection.query('CREATE DATABASE position');
            //         let addSql = operate.add_sql('positions', 'positionId, positionName, city, createTime, salary, companyId, companyName, companyFullName');
            //         let list = [];
            //         for (let i = 0; i < this.list.length; i++) {
            //             list.push([this.list[i]['positionId'], this.list[i]['positionName'], this.list[i]['city'], this.list[i]['createTime'], this.list[i]['salary'], this.list[i]['companyId'], this.list[i]['companyName'], this.list[i]['companyFullName']]);
            //         }
            //         console.log(list)
            //         connection.query(addSql,[list],function (err, result) {
            //             if(err){
            //                 console.log('[INSERT ERROR] - ',err.message);
            //                 return;
            //             }
            //            console.log('--------------------------INSERT----------------------------');
            //            //console.log('INSERT ID:',result.insertId);
            //            console.log('INSERT ID:',result);
            //            console.log('-----------------------------------------------------------------\n\n');  
            //         });
            //         connection.end();
            //         fs.writeFileSync('position.json', JSON.stringify(this.list));
            //     }
            // } else {
            //     // 替换IP
            //     console.log('proxy', _portProxy.proxy)
            //     console.log('length / 2', _portProxy.proxy[parseInt(_portProxy.proxy.length / 2)])
            //     this.options.proxy = _portProxy.proxy[parseInt(_portProxy.proxy.length / 2)]
            //     if (this.options.qs.pageNo < 5) {
            //         this.start();
            //     } else {
            //         fs.writeFileSync('position.json', JSON.stringify(this.list));
            //     }
            // }
        });
    }
}

class fetch_hostipal {
    constructor () {
        this.list = [];
        this.requestNumber = 0;
        this.options = {
            method: 'GET',
            url: 'http://m.soyoung.com/hospitalsearch',
            qs: {
                ajax: 1,
                index: 0
            },
            timeout: 5000,
            proxy: '',
            headers: {
                'Connection': 'keep-alive',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            json: true
        }
    }

    start (isFirst) {
        if (isFirst) {
            this.options.proxy = _portProxy.proxy[0];
            this.options.qs.proviocd_id = city[0].province_id;
            this.options.qs.country_id = city[0].country_id;
            _portProxy.proxy.shift();
            city.shift();
        }
        this.requestNumber++;

        request(this.options, (err, res, body) => {
            if (body && body.result) {
                this.options.qs.index++;
                if (body.result.view.dphospital.length === 0) {
                    this.options.qs.index = 0;
                    this.options.qs.province_id = city[0].province_id
                    this.options.qs.country_id = city[0].country_id
                    city.shift()
                    if (city.length === 0) {
                        db.hospitalId = this.list;
                        fs.readFile('test1.json', 'utf8', (err, data) => {
                          fs.writeFileSync('test1.json', JSON.stringify(this.list));
                        });
                        _fetch_sku.getSKU('first');
                        return
                    }
                }
                for (let item of body.result.view.dphospital) {
                    this.list.push({hospital_id: item.hospital_id, hospital_name: item.name_cn});
                    console.log('机构名称:', item.name_cn)
                }
                fs.readFile('hospital_data.json', 'utf8', (err, data) => {
                    fs.writeFileSync('hospital_data.json', JSON.stringify(this.list))
                })
                // 每个IP请求次数
                if (this.requestNumber > 10) {
                    // 请求次数置空
                    this.requestNumber = 0
                    // 刷新IP
                    _portProxy.updateIp()
                    // 替换IP
                    this.options.proxy = _portProxy.proxy[0]
                }
                this.start()
                this.list = Array.from(new Set(this.list))
            } else {
                // 替换IP
                console.log('proxy', _portProxy.proxy)
                console.log('length / 2', _portProxy.proxy[parseInt(_portProxy.proxy.length / 2)])
                this.options.proxy = _portProxy.proxy[parseInt(_portProxy.proxy.length / 2)]
                this.start()
            }
        });
    }
}

let _portProxy = new portProxy();
let _fetch_hospital = new fetch_hostipal();
let _fetch_lg = new Fetch_lg();

_portProxy.getIp()
