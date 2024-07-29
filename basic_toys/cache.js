/**  
 * 获取缓存
 * @author NanQi
 * @param {String} key 缓存键 
 * @return {String} 缓存值
 */
function get(key) {
    try {
        let res = uni.getStorageSync(key)

        if (!res) {
            return ''
        }

        res = JSON.parse(res)

        if (res.__expiretime && res.__expiretime < uni.utils.timestamp()) {
			remove(key)
            return ''
        } else {
            return res.data
        }
    } catch (e) {
        return ''
    }
}

/**  
 * 获取StorageData缓存
 * @author NanQi
 * @param {String} key 缓存键 
 * @return {String} 缓存值
 */
function getStorageData(key) {
    try {
        let res = uni.getStorageSync(key);

        if (!res) {
            return ''
        }

        res = JSON.parse(res)

        return res.data
    } catch (e) {
        return ''
    }
}

/**  
 * 设置缓存
 * @author NanQi
 * @param {String} key 缓存键 
 * @param {String} value 缓存值
 * @param {Number} expire 指定秒数后过期
 * @return void
 */
function set(key, value, expire = uni.conf.default_expire) {
    let cacheItem = {}
    cacheItem.data = value
    if (expire > 0) {
        cacheItem.__expiretime = uni.utils.timestamp() + expire
    }

    uni.setStorageSync(key, JSON.stringify(cacheItem))
}

/**
 * 有则取缓存，否则从调用回调并保存
 * @author NanQi
 * @param {String} key 缓存键
 * @param {String} callback 回调返回Promise
 * @param {Number} expire 指定秒数后过期
 * @return {Promise} Promise对象
 */
async function remember(key, callback, expire = uni.conf.default_expire) {
    let ret = this.get(key)
    if (ret) {
        return ret
    } else {
        ret = await callback()
        set(key, ret, expire)
        return ret
    }
}

/**  
 * 删除缓存
 * @author NanQi
 * @param {String} key 缓存键 
 * @return {void}
 */
function remove(key) {
    uni.removeStorageSync(key)
}

/**
 * 根据前缀批量删除缓存
 * @author NanQi
 * @param {String} prefix 缓存键的前缀 
 * @return void
 */
function removeList(prefix) {
    let keys = uni.getStorageInfoSync().keys
    if (keys && keys.length > 0) {
        keys.forEach(key => {
            if (key.indexOf(prefix) === 0) {
                uni.removeStorageSync(key)
            }
        })
    }
}

function _randomRemove() {
	const info = uni.getStorageInfoSync()
	if (info.currentSize > 0.7 * info.limitSize
	|| info.keys.length > uni.conf.autoRemoveCache.count 
	|| info.currentSize > uni.conf.autoRemoveCache.size) {
		for	(let i = 0; i < 100; i++) {
			if (info.keys.length < 1) {
				return
			}
			const key = info.keys[Math.floor(Math.random() * info.keys.length)]
			_removeExpired(key)
		}
	}
}

function _removeExpired(key) {
	let res = uni.getStorageSync(key);
	if (!res) {
	    return
	}
	
	res = JSON.parse(res)
	if (res.__expiretime && res.__expiretime < uni.utils.timestamp()) {
		remove(key)
	}
}

function _autoRemoveExpired() {
	const info = uni.getStorageInfoSync()
	if (info.currentSize > 0.7 * info.limitSize
	|| info.keys.length > uni.conf.autoRemoveCache.count 
	|| info.currentSize > uni.conf.autoRemoveCache.size) {
		if (info.keys && info.keys.length > 0) {
		    info.keys.forEach(key => {
		        _removeExpired(key)
		    })
		}
	}
}

function autoRemove(is_once = true) {
	const info = uni.getStorageInfoSync()
	if (info.currentSize > 0.9 * info.limitSize) {
		clearMemory()
	}
	
	if (is_once) {
		_autoRemoveExpired()
	} else {
		setInterval(_randomRemove, 2000)
	}
}



function clearFetch(url) {
    const prefixCacheKey = 'memory:fetch:' + url
    removeList(prefixCacheKey)
}

function clearMemory() {
    const prefixCacheKey = 'memory:'
    removeList(prefixCacheKey)
}

/**  
 * 清空缓存
 * @author NanQi
 * @return void
 */
function clear() {
    uni.clearStorageSync()
}

function getInfo() {
    return uni.getStorageInfoSync()
}

uni.cache = {
    get,
    getStorageData,
    set,
    remove,
    remember,
    clearFetch,
    clearMemory,
    clear,
    getInfo,
	autoRemove,
}