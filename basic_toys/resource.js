class RepositoryBase {

    constructor(resource) {
        this.resource = resource
    }

    list(query) {
        return uni.api.get(this.resource, query)
    }

    item(id) {
        const url = this.resource + '/' + id
		return uni.api.get(url)
    }

    add(newItem) {
        return uni.api.post(this.resource, newItem, true)
    }

    save(id, data) {
        const url = this.resource + '/' + id
		return uni.api.post(url, data, true, 'PUT')
    }

    remove(id) {
        const url = this.resource + '/' + id
		return uni.api.post(url, {}, true, 'DELETE')
    }
} 

uni.resource = (resource) => {
    return new RepositoryBase(resource)
}