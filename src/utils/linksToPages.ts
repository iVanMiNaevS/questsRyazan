export class AppRoutes {
	static readonly HOME = "/";
	static readonly RATING = "/rating";
	static readonly CONTACTS = "/contacts";

	static questBySlug(slug: string): string {
		return `/${slug}`;
	}
}
