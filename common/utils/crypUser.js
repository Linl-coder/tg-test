const CryptoJS = require("crypto-js");

// 加密敏感信息
const key = "siwuliuUser"; // 密钥
const userInfo = {
	queue: {
		nickname: "185****0004",
		avatar: "",
	},
	id: 176,
	company_id: 25,
	mobile: "18500000004",
	nickname: "185****0004",
	user_code: "90142673",
	user_sex: 0,
	birthday: null,
	cert_id: 0,
	balance: "0.00",
	remark: "",
	status: 1,
	add_time: "2023-12-25 14:07:58",
	food: "2500.0000000",
	avatar: null,
	invitedCount: 0,
	is_agent: 0,
	countPool: 0,
	register_num: 60,
	is_exists_address: 0,
	product: 0,
	cert: null,
	avatars: null,
};

const wordArray = CryptoJS.enc.Utf8.parse(JSON.stringify(userInfo)); // 将用户信息转换为 WordArray 对象
const encryptedData = CryptoJS.AES.encrypt(wordArray, key).toString();
console.log("encryptedData==>", encryptedData);

const decryptedWordArray = CryptoJS.AES.decrypt(encryptedData, key);
const decryptedData = JSON.parse(
	decryptedWordArray.toString(CryptoJS.enc.Utf8),
);
console.log("解密后的数据==>", decryptedData);