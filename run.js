const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * 下载 HTTPS 文件
 * @param {string} url - 远程文件地址
 * @param {string} dest - 本地保存路径
 */ const AUKIN =[]; 
function downloadFile(url, dest) {
    if (arguments.length == 1) {
	if (fs.existsSync(url)) return 0; AUKIN.push(url); 
	dest = url, url = 'https://' + url.replace(/_\//g,'/');
    }
    fs.mkdirSync(dest.replace(/[^\/]+$/,''), { recursive: true });
    return new Promise((resolve, reject) => {
        // 创建可写流
        const file = [];
        var e1, e2, et = 0 &&setTimeout(_=>{
		reject('Timeout');
		try { e1.destroy(); } catch {}
		try { e2.destroy(); } catch {}}, 120000);
        // 发起 HTTPS GET 请求
        e1 = https.get(url, (response) => { e2 = response;
            // 检查响应状态码，如果是重定向需要处理（此处简化处理，仅判断200）
            if (response.statusCode !== 200) {
                fs.unlink(dest, () => {}); // 删除未完成的文件
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }

            // 将响应数据管道传输到文件流
            response.on('data', x=>file.push(x));

            // 监听文件流关闭事件，表示下载完成
            response.on('end', () => {
                // console.log(`Download completed: ${dest}`);
		fs.writeFileSync(dest, Buffer.concat(file));
                resolve(dest);
            });

            // 监听错误
            response.on('error', (err) => {
                reject(err);
            }); response.setTimeout(120000, reject);
        }).on('error', (err) => {
            //fs.unlink(dest, () => {});
            reject(err);
        }).setTimeout(120000, reject);
    });
}

function getAbsolutePath(baseUrl, relativePath) {
    try {
        // URL 构造函数自动处理相对路径解析
        const url = new URL(relativePath, 'http://a/' + baseUrl);
        return url.pathname.slice(1);
    } catch (e) {
        throw e;
    }
}

function getAddr(file) {
	var data = fs.readFileSync(file, 'utf8');
	var ret = [];
	var data2 = data.replace('https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800|Open+Sans+Condensed:300,700','https://fonts.googleapis.com/css.css')
		.replace(/"([^"]*\.(?:css|xml|js|html|png|gif|jpg|pdf))("|#)/g, (_,url,suffix)=>{
		url = url.replace(/\/(CON|PRN|AUX|NUL|COM\d?|LPT\d?|CONIN|CONOUT)(?=\/)/gi,'/$1_');
		_ = _.replace(/\/(CON|PRN|AUX|NUL|COM\d?|LPT\d?|CONIN|CONOUT)(?=\/)/gi,'/$1_');
		if (url.startsWith('uops.info/')) url = url; else
		if (url.startsWith('felixcloutier.com/')) url = url; else
		if (url.startsWith('http:')) url = url, fs.mkdirSync('huge/'+encodeURIComponent(url), { recursive: true }); else
		if (url.startsWith('https://')) url = url.slice(8); else
		if (url.startsWith('/')) url = file.split('/')[0] + '/' + url.slice(1); else
		return ret.push(getAbsolutePath(file, url)), _;
		
		if (!WHITELIST[url.split('/')[0]]) return fs.mkdirSync('exhost/'+encodeURIComponent(url.split('/')[0]), { recursive: true }), _;

		ret.push(url);
		return '"'+ file.split('/').filter(t=>t).slice(1).map(t=>'../').join('') + url + suffix;
	});
	if (data != data2) fs.writeFileSync(file, data2, 'utf8');
	return ret;
}

const WHITELIST = {
  'uops.info': 1,
  'cdnjs.cloudflare.com': 1,
  'cdn.jsdelivr.net': 1,
  'cdn.datatables.net': 1,
  'ajax.googleapis.com': 1,
  'fonts.googleapis.com': 1,
  'www.jacklmoore.com': 1,
  'cdn.plot.ly': 1,
}
const LIST = [], DONE = new Set([
"uops.info/dissertation.pdf",
"uops.info/instructions_Apr2019.xml","uops.info/instructions_Jan2022.xml","uops.info/instructions_Nov2020.xml","uops.info/instructions_Apr2022.xml","uops.info/instructions_Jun2021.xml","uops.info/instructions_Nov30_2019.xml","uops.info/instructions_Dec2021.xml","uops.info/instructions_Mar2020.xml","uops.info/instructions_Sep2018.xml","uops.info/instructions_Dec2022.xml","uops.info/instructions_Mar2021.xml"
]), LOADING = new Set;
var rthd = 0, LLID = 0;

async function downloadAndConvert(url) {
if (DONE.has(url)) return;
DONE.add(url);
++rthd; try { LOADING.add(url);
	await downloadFile(url);
	LIST.push(...getAddr(url));
} catch (e) {console.error(e, url)}
finally { --rthd; LOADING.delete(url);}
}

LIST.push("uops.info/index.html");
setInterval(_=>{// console.log(LIST);
	while (rthd < 20 && LIST.length > LLID && LLID < 10000000) {
		downloadAndConvert(LIST[LLID++]);
	} if (rthd == 0) {
		process.exit();
	}
}, 1);

setInterval(_=>{// console.log(LIST);
	console.log(rthd, LLID, LIST.length, AUKIN, LOADING, LIST.slice(LLID, LLID+10).join`  `);
}, 5000);









