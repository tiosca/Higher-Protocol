export const capitalize = str => str[0].toUpperCase() + str.slice(1);

export const range = (start, end) => Array(end - start + 1).fill().map((_, idx) => start + idx)

export const returnToSignin = () => {
	return {
		redirect: {
			destination: '/auth/signin',
			permanent: false
		}
	}
}

export const isEmpty = obj =>
	obj
	&& Object.keys(obj).length === 0
	&& Object.getPrototypeOf(obj) === Object.prototype

export const conditionallyParseJSON = str => typeof str === 'string' ? JSON.parse(str) : str

export const htmlListToArray = str =>
	typeof str === 'string'
	? str.replace(/(<\/?li>){1,2}/g, 'VVV').split('VVV').filter(x=>!!x)
	: str
