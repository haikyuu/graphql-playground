const schema = `
	type Query {
		posts: [Post]
	}

	type Post {
		# github post
		title: String
		text: String
		author: Author
	}
	type Author {
		firstName: String
		lastName: String
		posts: [Post]
	}
	schema {
		query: Query
	}
`
module.exports = [schema]