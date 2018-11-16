const http = require('http');
const url = require('url');
const fs = require('fs');

const users = {
    user: null,
    password: null
}

let server = http.createServer( (req, res) => {
    // Get
    let {pathname, query} = url.parse(req.url, true);
    console.log(pathname)
    fs.readFile(`template${pathname}`, (err, data) => {
        console.log('get:', err);
        if (!err) {
            console.log(data)
            res.write(data);
        }
        res.end();
    })
    let {user, password} = query;
    // POST
    let str = '';
    req.on('data', data => {
        str += data;
    });
    req.on('end', () => {
        switch (pathname) {
            case '/reg':
                if (!user) {
                    res.write('{"err": 1, "msg": "请输入姓名"}');
                } else if (user !== users.user && users.user) {
                    res.write('{"err": 1, "msg": "姓名错误"}');
                } else if (!password) {
                    res.write('{"err": 1, "msg": "请输入密码"}');
                } else {
                    res.write('{"err": 0, "msg": "注册成功"}');
                    users.user = user;
                    users.password = password;
                }
                break;
            case '/login':
                if (!user) {
                    res.write('{"err": 1, "msg": "请输入姓名"}');
                } else if (!users.user) {
                    res.write('{"err": 1, "msg": "用户不存在"}');
                } else if (user !== users.user) {
                    res.write('{"err": 1, "msg": "姓名错误"}');
                } else if (!password) {
                    res.write('{"err": 1, "msg": "请输入密码"}');
                } else if (password !== users.password) {
                    res.write('{"err": 1, "msg": "密码错误"}');
                } else {
                    res.write('{"err": 0, "msg": "登录成功"}');
                }
                break;
        }
    });
});
server.listen(3106);

console.log('service starting at http://localhost:3106')