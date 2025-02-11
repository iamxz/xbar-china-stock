#!/Users/xue/.nvm/versions/node/v20.18.1/bin/node
/*
*<xbar.title>股票提示</xbar.title>
* <xbar.version>v0.1</xbar.version>
* <xbar.author>iamxz</xbar.author>
* <xbar.author.github>iamxz</xbar.author.github>
* <xbar.desc>沪深股票提醒.</xbar.desc>
* <xbar.dependencies>xbar-china-stock</xbar.dependencies>
* <xbar.image>https://github.com/iamxz/xbar-china-stock/blob/main/preview.png</xbar.image>
* <xbar.abouturl>https://github.com/iamxz/xbar-china-stock</xbar.abouturl>
*/

const https = require('https'); // 引入 Node.js 的 https 模块
const iconv = require('iconv-lite'); // 引入 iconv-lite 模块

class Tencent {
    stockApi(stockCode) {
        return "https://qt.gtimg.cn/q="+ stockCode;
    }

    fetchStockData(stockCode) {
        return new Promise((resolve, reject) => {
            https.get(this.stockApi(stockCode), (response) => {
                const data = []; // 使用数组来存储数据块

                // 监听数据块
                response.on('data', (chunk) => {
                    data.push(chunk); // 将每个数据块推入数组
                });

                // 监听请求结束
                response.on('end', () => {
                    try {
                        // 使用 iconv-lite 转码 GBK
                        const buffer = Buffer.concat(data); // 合并数组中的所有数据块
                        const decodedData = iconv.decode(buffer, 'gbk'); // 转码为 UTF-8
                        const res = this.formatResponseData(decodedData)
                    
                        resolve(res); // 返回获取到的文本数据
                    } catch (error) {
                        reject(error);
                    }
                });
            }).on('error', (error) => {
                reject(error);
            });
        });
    }
    extractContentFromQuotesAndSplit(text) {
        return text.split('~').map(item => item.trim()); // 去除空格
    }
    formatResponseData(stocksDetail) {
        const stock = this.extractContentFromQuotesAndSplit(stocksDetail);
        const stockDict = {
            name: stock[1],
            code: stock[2],
            now: parseFloat(stock[3]),
            close: parseFloat(stock[4]),
            open: parseFloat(stock[5]),
            volume: parseFloat(stock[6]) * 100,
            bidVolume: parseInt(stock[7]) * 100,
            askVolume: parseFloat(stock[8]) * 100,
            bid1: parseFloat(stock[9]),
            bid1Volume: parseInt(stock[10]) * 100,
            bid2: parseFloat(stock[11]),
            bid2Volume: parseInt(stock[12]) * 100,
            bid3: parseFloat(stock[13]),
            bid3Volume: parseInt(stock[14]) * 100,
            bid4: parseFloat(stock[15]),
            bid4Volume: parseInt(stock[16]) * 100,
            bid5: parseFloat(stock[17]),
            bid5Volume: parseInt(stock[18]) * 100,
            ask1: parseFloat(stock[19]),
            ask1Volume: parseInt(stock[20]) * 100,
            ask2: parseFloat(stock[21]),
            ask2Volume: parseInt(stock[22]) * 100,
            ask3: parseFloat(stock[23]),
            ask3Volume: parseInt(stock[24]) * 100,
            ask4: parseFloat(stock[25]),
            ask4Volume: parseInt(stock[26]) * 100,
            ask5: parseFloat(stock[27]),
            ask5Volume: parseInt(stock[28]) * 100,
            lastTrades: stock[29],
            change: parseFloat(stock[31]),
            changePercent: parseFloat(stock[32]),
            high: parseFloat(stock[33]),
            low: parseFloat(stock[34]),
            volume: parseInt(stock[36]) * 100,
            pe: this.safeFloat(stock[39]),
            high2: parseFloat(stock[41]),
            low2: parseFloat(stock[42]),
            amplitude: parseFloat(stock[43]),
            circulatingMarketCap: this.safeFloat(stock[44]),
            totalMarketCap: this.safeFloat(stock[45]),
            pb: parseFloat(stock[46]),
            upperLimitPrice: parseFloat(stock[47]),
            lowerLimitPrice: parseFloat(stock[48]),
            volumeRatio: this.safeFloat(stock[49])
        };
        return stockDict;
    }

    safeAcquireFloat(stock, idx) {
        try {
            return this.safeFloat(stock[idx]);
        } catch (e) {
            return null;
        }
    }

    safeFloat(value) {
        const num = parseFloat(value);
        return isNaN(num) ? null : num;
    }
}


var qq = new Tencent()

   
async function show(code) {
    // 假设 quotation.real 方法已经在其他地方定义，返回股票数据
    const data = await  qq.fetchStockData(code)
    const now = data.now;
    const close = data.close;

    if (close) {
        const p = ((now - close) * 100) / close;
        if (now > close) {
            console.log(`${now.toFixed(3)} ↑ ${p.toFixed(2)}%| color=red`);
        } else if (now < close) {
            console.log(`${now.toFixed(3)} ↓ ${p.toFixed(2)}%| color=green`);
        } else {
            console.log(`${now.toFixed(3)} `);
        }
    } else {
        console.log(`${now.toFixed(3)} `);
    }

}

// 示例调用: 上证 恒生互联

(async (params) => {
    await show('sh513330');
    console.log('---')
    await show('sz002385');
})();


