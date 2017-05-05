const casual = require('casual')
const posts = [
{
	title: casual.title,
	text: casual.text,
}, 
{
	title: casual.title,
	text: casual.text,
}]

const resolvers = {
	String: "String",
	Query: {
		posts: (obj, args, context, info)=> posts
	},
	Post: {
		author: (post)=>{
			return {
				firstName: `${post.title} Writer`,
				lastName: casual.last_name,
			}
		}
	},
	Author: {
		posts: (author)=>{
			return posts.filter( post=> author.firstName.indexOf(post.title)> -1 )
		}
	}
}
module.exports = resolvers