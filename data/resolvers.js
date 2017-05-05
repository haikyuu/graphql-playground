const casual = require('casual')
const { Post, Author, View, FortuneCookie, } = require('./connectors')
console.log('Post', Post)
const resolvers = {
	Query: {
		posts: (obj, args)=> Post.findAll({ where: args }),
		author: (obj, args)=> Author.find({ where: args }),
		getFortuneCookie: ()=> FortuneCookie.getOne(),
	},
	Post: {
		author: (post, args)=> post.getAuthor(),
		views: (post, args)=> View.findOne({ postId: post.id }).then(view=>view.views),
	},
	Author: {
		posts: (author)=> author.getPosts(),
	}
}
module.exports = resolvers