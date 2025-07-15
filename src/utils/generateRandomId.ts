export function generateRandomId(): number {
	const timestamp = Date.now() & 0x7fffffff;
	const random = Math.floor(Math.random() * 10000);
	return (timestamp * 10000 + random) & 0x7fffffff;
}
