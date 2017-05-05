const schema = `
	type Query {
		posts(id: Int): [Post]
		author(firstName: String, lastName: String): Author
		getFortuneCookie: String
	}

	type Post {
		# github post
		id: Int
		title: String
		text: String
		author: Author
		views: Int
	}
	type Author {
		id: Int
		firstName: String
		lastName: String
		fullName: String
		posts: [Post]
	}
	schema {
		query: Query
	}
`
module.exports = [schema]