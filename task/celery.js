import schedule from 'node-schedule'

// 5秒一次 测试用
let test = schedule.scheduleJob('*/5 * * * * *', function () {
    console.log(dateformat(new Date(), 'isoDateTime') + '测试5s一次')
    console.log(Date.now())
})


