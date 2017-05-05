const Sequelize = require('sequelize')
const casual = require('casual')
const _ = require('lodash')
const Mongoose = require('mongoose')

const rp = require('request-promise')

const db = new Sequelize('blog', null, null, {
	dialect: 'sqlite',
	storage: './blog.sqlite',
})

const AuthorModel = db.define('author', {
	firstName: { type: Sequelize.STRING, },
	lastName: { type: Sequelize.STRING, },	
}, {
    getterMethods: {
        fullName: function(){
        	return `${this.firstName} ${this.lastName}`
        }
    },
})

const PostModel = db.define('post', {
	title: { type: Sequelize.STRING, },
	text: { type: Sequelize.STRING, },
})

AuthorModel.hasMany(PostModel)
PostModel.belongsTo(AuthorModel)

casual.seed(123)
//views in MongoDB

const mongo = Mongoose.connect('mongodb://localhost/views')

const ViewSchema = Mongoose.Schema({
	postId: Number,
	views: Number,
})

const View = Mongoose.model('views', ViewSchema)

db.sync({ force: true, }).then(()=>{
	console.log('sync');
	_.times(10, ()=>{
		
		return AuthorModel.create({
			firstName: casual.first_name,
			lastName: casual.last_name,
		}).then(author=>{
			return author.createPost({
				title: `A post by ${author.firstName}`,
				text: casual.description,
			}).then(post=>{
				return View.update(
					{ postId: post.id },
					{ views: casual.integer(0, 100) },
					{ upsert: true}
				)
			})
		})

	})
})

const Author = db.model('author')
const Post = db.model('post')
const FortuneCookie = {
	getOne: ()=> rp('http://fortunecookieapi.herokuapp.com/v1/cookie')
		.then(res=> JSON.parse(res))
		.then(res=> res[0].fortune.message)
}
module.exports = {
	Author,
	Post,
	View,
	FortuneCookie,
}
